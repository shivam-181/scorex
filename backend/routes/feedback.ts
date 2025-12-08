import express from 'express';

const router = express.Router();

// POST /api/feedback
router.post('/', (req, res) => {
    const { category, message, userEmail } = req.body;
    
    // Log for now since Resend is handled in frontend
    console.log('Feedback received at Backend:', { category, message, userEmail });
    
    // In the future, we can save this to MongoDB if needed.
    
    res.status(200).json({ success: true, message: 'Feedback logged on backend' });
});

export default router;
