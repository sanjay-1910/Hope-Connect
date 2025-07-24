const express = require("express");
const multer = require("multer");
const fs = require("fs");
const http = require("http");
const cors = require("cors");
const WebSocket = require("ws");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

require("dotenv").config();

const app = express();
const port = 3001;
// global.not_mail_for_user_who_loggedin = "anonymous";
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: "/ws" });
wss.on("connection", (ws) => {
  console.log("✅ WebSocket client connected");
  ws.on("message", (message) => {
    console.log("📨 WebSocket message:", message.toString());
    ws.send("🟢 Server received: " + message);
  });
  ws.on("close", () => {
    console.log("❌ WebSocket connection closed");
  });
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => console.error("❌ MongoDB connection error:", err));



const Report = mongoose.model("Report", new mongoose.Schema({
  name: String,
  age: Number,
  lastSeenLocation: String,
  dateLastSeen: String,
  locationFound: String,     // ✅ Added
  dateFound: String,         // ✅ Added
  description: String,
  contactInfo: String,
  photoUrl: String,
  s3ObjectKey: String,
  submittedBy: String,
  createdAt: { type: Date, default: Date.now },
  type: String,
}));




const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  otp: String,
  isVerified: { type: Boolean, default: false }
});


const User = mongoose.model('User', userSchema);


const notificationSchema = new mongoose.Schema({
  userEmail: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});
const Notification = mongoose.model("Notification", notificationSchema);



// ✅ OTP Generator
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// ✅ Send OTP using Nodemailer
const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,       // Your Gmail
      pass: process.env.EMAIL_PASS,  // Your Gmail App Password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Email Verification OTP',
    html: `<h3>Your OTP is <b>${otp}</b></h3>`,
  };

  await transporter.sendMail(mailOptions);
};


const sendMatchEmail = async (to, personDetails, role) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject: `🔔 Match Found Notification (${role})`,
    html: `
      <h3>Hello,</h3>
      <p>A possible match has been found based on your ${role === "reporter" ? "missing" : "found"} report.</p>
      <p><strong>Name:</strong> ${personDetails.name}</p>
      <p><strong>Age:</strong> ${personDetails.age}</p>
      <p><strong>Description:</strong> ${personDetails.description}</p>
      <p><strong>Contact Info:</strong> ${personDetails.contactInfo}</p>
      <p><img src="${personDetails.photoUrl}" alt="Match Photo" width="200"/></p>
      <p>Please log in to your dashboard for more details.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};




// ✅ REGISTER Route
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();

    const user = new User({ name, email, password: hashedPassword, otp });
    await user.save();

    await sendOtpEmail(email, otp);
    res.status(200).json({ message: 'OTP sent to email' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ VERIFY OTP Route
app.post('/api/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ LOGIN Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.isVerified) return res.status(403).json({ message: 'Email not verified or user does not exist' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    // not_mail_for_user_who_loggedin = email;

    res.status(200).json({ message: 'Login successful' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



const {
  S3Client,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const {
  RekognitionClient,
  CreateCollectionCommand,
  IndexFacesCommand,
  SearchFacesByImageCommand,
} = require("@aws-sdk/client-rekognition");

const REGION = process.env.AWS_REGION;
const BUCKET = process.env.S3_BUCKET;
const COLLECTION_ID = "sanjay";

const s3 = new S3Client({ region: REGION });
const rekognition = new RekognitionClient({ region: REGION });

const upload = multer({ dest: "uploads/" });

(async () => {
  try {
    await rekognition.send(new CreateCollectionCommand({ CollectionId: COLLECTION_ID }));
    console.log("✅ Rekognition collection ready");
  } catch (err) {
    if (err.name !== "ResourceAlreadyExistsException") {
      console.error("❌ Error creating collection:", err);
    }
  }
})();


const uploadToS3AndIndex = async (file) => {
  const uniqueName = `${uuidv4()}.${file.originalname.split(".").pop()}`;
  const s3Key = `uploads/${uniqueName}`;
  const fileData = fs.readFileSync(file.path);
  

  // Upload to S3
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: s3Key,
    Body: fileData,
    ContentType: file.mimetype,
    ACL: 'public-read',
  }));

  // Index in Rekognition
  try {
    const indexResult = await rekognition.send(new IndexFacesCommand({
      CollectionId: COLLECTION_ID,
      Image: { S3Object: { Bucket: BUCKET, Name: s3Key } },
      ExternalImageId: uniqueName,
      DetectionAttributes: ["DEFAULT"],
    }));

    console.log("✅ IndexFacesCommand success:", JSON.stringify(indexResult, null, 2));

    if (!indexResult.FaceRecords || indexResult.FaceRecords.length === 0) {
      console.warn("⚠️ No face was indexed. Check if the image contains a detectable face.");
    }

  } catch (err) {
    console.error("❌ Failed to index face:", err);
  }

  return { s3Key, photoUrl: `https://${BUCKET}.s3.${REGION}.amazonaws.com/${s3Key}` };
};


// --- API: Submit Missing Report ---
app.post("/report-missing", upload.single("photo"), async (req, res) => {
  try {
    const imageBytes = fs.readFileSync(req.file.path);
    const matchResult = await rekognition.send(new SearchFacesByImageCommand({
      CollectionId: COLLECTION_ID,
      Image: { Bytes: imageBytes },
      FaceMatchThreshold: 90,
      MaxFaces: 1,
    }));

    const matchedFace = matchResult.FaceMatches?.[0]?.Face;
    if (matchedFace) {
      const s3Key = `uploads/${matchedFace.ExternalImageId}`;
      const report = await Report.findOne({ s3ObjectKey: s3Key, type: "missing" });
      if (report) {
        return res.status(200).json({ message: "⚠️ Match found with a found report", report });
      }
    }

    const { s3Key, photoUrl } = await uploadToS3AndIndex(req.file);

    const report = new Report({
      ...req.body,
      age: parseInt(req.body.age),
      photoUrl,
      s3ObjectKey: s3Key,
      submittedBy: req.body.submittedBy || "Anonymous",
      // : not_mail_for_user_who_loggedin || "Anonymous",
      type: "missing",
    });

    await report.save();
    res.status(200).json({ message: "✅ Missing report saved", report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "❌ Error submitting missing report" });
  } finally {
    if (req.file) fs.unlinkSync(req.file.path);
  }
});

// --- API: Submit Found Report ---
// ... (All previous requires and setup remain unchanged)

app.post("/report-found", upload.single("photo"), async (req, res) => {
  try {
    const imageBytes = fs.readFileSync(req.file.path);

    const matchResult = await rekognition.send(new SearchFacesByImageCommand({
      CollectionId: COLLECTION_ID,
      Image: { Bytes: imageBytes },
      FaceMatchThreshold: 90,
      MaxFaces: 1,
    }));

    const matchedFace = matchResult.FaceMatches?.[0]?.Face;

    if (matchedFace) {
      const matchedImageId = matchedFace.ExternalImageId;
      const s3Key = `uploads/${matchedImageId}`;
      const report = await Report.findOne({ s3ObjectKey: s3Key, type: "missing" });

      if (report) {
        // ✅ Only now upload the current image so that you can send its photo to the missing person reporter
        const { photoUrl } = await uploadToS3AndIndex(req.file);

        const foundDetails = {
          name: req.body.name || 'N/A',
          age: req.body.approximateAge || 'N/A',
          contactInfo: req.body.contactInfo || 'N/A',
          description: req.body.description || 'N/A',
          photoUrl
        };

        await sendMatchEmail(report.contactInfo, foundDetails, "reporter");
        await sendMatchEmail(req.body.contactInfo, report, "finder");

        await Notification.create({ userEmail: report.contactInfo, message: "A match has been found with your missing report." });
        await Notification.create({ userEmail: req.body.contactInfo, message: "A match has been found with a missing person." });


        return res.status(200).json({
          message: "⚠️ Match found with a missing report. Emails sent.",
          match: {
            name: report.name || 'N/A',
            age: report.age || 'N/A',
            contactInfo: report.contactInfo || 'N/A',
            description: report.description || 'N/A',
            photoUrl: report.photoUrl || ''
          }
        });
      }
    }

    // ✅ No match found, proceed to upload and save
    const { s3Key, photoUrl } = await uploadToS3AndIndex(req.file);

    const newReport = new Report({
      age: parseInt(req.body.approximateAge),
      locationFound: req.body.locationFound,
      dateFound: req.body.dateFound,
      description: req.body.description,
      contactInfo: req.body.contactInfo,
      photoUrl,
      s3ObjectKey: s3Key,
      submittedBy: req.body.submittedBy || "Anonymous",
      // : not_mail_for_user_who_loggedin || "Anonymous",

      type: "found",
    });

    await newReport.save();
    res.status(200).json({ message: "✅ Found report saved", report: newReport });

  } catch (err) {
    console.error("❌ Error submitting found report:", err);
    res.status(500).json({ error: "❌ Error submitting found report" });
  } finally {
    if (req.file) fs.unlinkSync(req.file.path);
  }
});

// GET all missing persons
app.get('/api/missing', async (req, res) => {
  try {
    const missing = await Report.find({ type: 'missing' }).sort({ createdAt: -1 });
    res.json(missing);
  } catch (err) {
    console.error('❌ Error fetching missing persons:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET all found persons
app.get('/api/found', async (req, res) => {
  try {
    const found = await Report.find({ type: 'found' }).sort({ createdAt: -1 });
    res.json(found);
  } catch (err) {
    console.error('❌ Error fetching found persons:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


// --- API: Match Image Only ---
app.post("/match-photo", upload.single("image"), async (req, res) => {
  try {
    const imageBytes = fs.readFileSync(req.file.path);

    const result = await rekognition.send(new SearchFacesByImageCommand({
      CollectionId: COLLECTION_ID,
      Image: { Bytes: imageBytes },
      FaceMatchThreshold: 90,
      MaxFaces: 1,
    }));

    const matchedFace = result.FaceMatches?.[0]?.Face;
    if (!matchedFace) {
      return res.status(404).json({ message: "❌ No match found" });
    }

    const s3Key = `uploads/${matchedFace.ExternalImageId}`;
    const report = await Report.findOne({ s3ObjectKey: s3Key });
    if (!report) {
      return res.status(404).json({ message: "❌ Match found in Rekognition, but not in DB" });
    }

    res.status(200).json({ message: "✅ Match found", report });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "❌ Error during match" });
  } finally {
    if (req.file) fs.unlinkSync(req.file.path);
  }
});

server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});



