const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const admin = require('firebase-admin');

// Load environment variables
dotenv.config();

// Initialize Firebase Admin SDK
const serviceAccount = {
  "type": "service_account",
  "project_id": "hackathon-99a35",
  "private_key_id": "5479d2aa0b44577c4736a6f96c2bf7e61182829b",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDBtKOV13mAyiC/\nunRBTpH33waUTQIu8dvh8TQP0GyC50y/it/D9s8D/9le4x2CwEvvRqTqIr2Ueu2p\n1O9u5avQf0GIzP91Z6I100Wqtec9Xaibw+WerFpyAlA9oWz0oiH17Mdef0vayM14\naaCr8ZBN8ai2GoD4Pb5PYOSN53ptN1tu+CYmO9UMmI9de90oH3ukA8wsXk3cNutp\ncfeaGqWLt5lWJa0boderC5OI4dnn/GOE9CkImdGgQ9MnKRd3UNNWSwYq5avZXlvw\nmXdimJ2IYe7mPNi2Gaz/4Z7bG7avVk/7/iorNWRm/enwU5UCDAs7ipUSdqoP2REO\nlBdMea2ZAgMBAAECggEAGoyeMT7vzdmmZHDzVzIkKpOcbL4jUvjeWNj8+D/qZ4S5\nTbWElvDgjd1G100MseuWXMzTdK3fSxcQNQtU59+9zV1rx4rFZruWDYeQEGZPM+d+\n4R6X/cgEu4Sap9/UtbD1M6ZI6yhKZsnH872Sgo6g5zX8mD0IuT2JNIsEuHhmHMrQ\n7HmGV4VjsnZ2+HcpJ7QLJNA3m50K2DvWAe4QBdJX1n2JIYh8rK2pJw07CmAmccmg\nb3hQZCkQJkIRvLOHVyVb7Q0u70QQQH3ypEamgBsSImfo239U3hGPyLHEis4Adwpo\nM1FeLzG+CeLgfJoOTjNtfjOq5dzuLMSN/oY6EUNSywKBgQDsP1FGPF/ByRFoZjCo\nPJN/2666t1xNRQl1P/4DTFjRRH1gdUVTtjC5FJE+19VODmde3sNYbTnZgr0v7/pQ\nM+pe8kJ//jMGtNqPZaQ+FH7rAA/kmSEDVKq9peeD6OyaXJHv3O5VRmM92lXZNwIl\n2tPK3G7ZP9LChtA7+Yu3GgI7owKBgQDR5sAsa4qsZdKqHC7f2hXBlwRqc+RdF90S\nIlNzmgbO/wp3msq2Pny87U5WsqO6mxDNCw8PjLLhdon8hsLR2JO5gWY3wjjvmNEs\nHFd0ek034k66DFoGKTSDs0BWH7m9kwYPj2C6eQINXbvgWJL45mPhFBs7anMckWDg\nDWcXqk/FkwKBgCSNd2nClZ5KGeNpTEX7eWbi+pnxHNrnv5rgl9Cy01stmah+/IcD\nPW6lfAOZKWu2VtAa72aTH8xDqjnsi3I1ViHyoc9j6Uk0WkytkUf5q9l4XP0lpDH7\nu580OCn0tAb+I6ZVLJsNFPXQ/k9pb2+j9/j/Ojdq5JUsfrOI3NEruQS5AoGBALuY\nC3CnvIxPhHPcNFiERKV8Hso1QYeh6EZov0S2CBfAAM7cXQd72WfQfw8lIQeJxv46\nP/+Zs9WlZ7V1i3CYq45Dg+OZheE9JtTRj6feFl03uTy2BU80TGbYMUvHlu1DFUua\nzMxbkeX4PA1JnDEvV1y155C2lqKVm4si71xLLnhZAoGBAKuKjQ6heGQoOPyTA1Y2\nVsgdIho+eYr7NGrUERa6KMn6vORzAQM3D3FBT2rLCDnRtCEgvao+UZY9AGGW/Tbf\nYS2DKJwIE2BYPRGEzbCOFdYHt5eZbwVjYkhtLGO+VzQjid32C1RVgjzPAXBG3QCR\nq1PuGn9vmScklgFvB2wCdPii\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@hackathon-99a35.iam.gserviceaccount.com",
  "client_id": "115509094499616480377",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40hackathon-99a35.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Update with your frontend URL
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api', require('./Routes/auth-routes'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Firebase Auth Backend Running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});