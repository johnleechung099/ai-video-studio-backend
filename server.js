const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        status: "ok",
        message: "AI Video Studio backend is running"
    });
});

app.post("/video/generate", (req, res) => {

    const { prompt, aspectRatio } = req.body;

    if (!prompt) {
        return res.status(400).json({
            error: "Prompt is required"
        });
    }

    console.log("Video generation request received");
    console.log("Aspect ratio:", aspectRatio);
    console.log("Prompt:", prompt);

    res.json({
        status: "accepted",
        message: "Video generation job received",
        aspectRatio: aspectRatio || "16:9",
        jobId: "test-job-001"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(
        `AI Video Studio backend running on port ${PORT}`
    );
});
