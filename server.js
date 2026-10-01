const express = require("express");

const app = express();

app.use(express.json({ limit: "2mb" }));


// ==========================================
// HOME / HEALTH CHECK
// ==========================================

app.get("/", (req, res) => {

    res.json({
        status: "ok",
        message: "AI Video Studio backend is running"
    });

});


// ==========================================
// CREATE COMPLETE 30-SCENE PACKAGE
// ==========================================

app.post("/story/package", (req, res) => {

    const story =
        String(req.body.story || "").trim();

    const aspectRatio =
        String(req.body.aspectRatio || "16:9");

    const style =
        String(req.body.style || "Cinematic");

    const voice =
        String(req.body.voice || "Female Storyteller");

    const duration =
        String(req.body.duration || "5 minutes");

    const characters =
        Array.isArray(req.body.characters)
            ? req.body.characters
            : [];


    if (!story) {

        return res.status(400).json({
            error: "Story is required"
        });

    }


    const sceneTypes = [

        "OPENING HOOK",
        "CHARACTER INTRODUCTION",
        "STORY WORLD",
        "CHARACTER GOAL",
        "FIRST UNUSUAL EVENT",
        "CHARACTER REACTION",
        "FIRST INVESTIGATION",
        "IMPORTANT LOCATION",
        "IMPORTANT OBJECT",
        "FIRST CLUE",
        "CHARACTER DECISION",
        "JOURNEY BEGINS",
        "NEW CHARACTER",
        "IMPORTANT CONVERSATION",
        "PROBLEM APPEARS",
        "FIRST SOLUTION ATTEMPT",
        "OBSTACLE",
        "MYSTERY DEEPENS",
        "SECOND CLUE",
        "UNEXPECTED DISCOVERY",
        "EMOTIONAL MOMENT",
        "MAJOR TWIST",
        "TRUTH BEGINS",
        "MAJOR DISCOVERY",
        "CONFRONTATION",
        "CLIMAX",
        "MAJOR ACTION",
        "PROBLEM RESOLUTION",
        "EMOTIONAL CONCLUSION",
        "FINAL LESSON"

    ];


    const characterBible =
        buildCharacterBible(characters);


    const scenes = [];


    for (let i = 0; i < 30; i++) {

        const sceneNumber = i + 1;

        const sceneType =
            sceneTypes[i];


        const scene =
            buildScene(
                sceneNumber,
                sceneType,
                story,
                aspectRatio,
                style,
                voice,
                characterBible
            );


        scenes.push(scene);

    }


    res.json({

        status: "success",

        project: {

            title: "AI Story Video",

            duration: duration,

            aspectRatio: aspectRatio,

            style: style,

            voice: voice

        },

        characterBible: characterBible,

        totalScenes: 30,

        scenes: scenes

    });

});


// ==========================================
// EXISTING VIDEO GENERATION ENDPOINT
// ==========================================

app.post("/video/generate", (req, res) => {

    const prompt =
        String(req.body.prompt || "").trim();

    const aspectRatio =
        String(
            req.body.aspectRatio || "16:9"
        );


    if (!prompt) {

        return res.status(400).json({
            error: "Prompt is required"
        });

    }


    console.log(
        "Video generation request received"
    );

    console.log(
        "Aspect ratio:",
        aspectRatio
    );

    console.log(
        "Prompt:",
        prompt
    );


    res.json({

        status: "accepted",

        message:
            "Video generation job received",

        aspectRatio:
            aspectRatio,

        jobId:
            "test-job-" +
            Date.now()

    });

});


// ==========================================
// CHARACTER BIBLE
// ==========================================

function buildCharacterBible(characters) {

    if (!characters.length) {

        return {

            characters: [],

            globalRules: [
                "Maintain character identity",
                "Keep appearance consistent",
                "Keep clothing consistent",
                "Do not randomly change faces"
            ]

        };

    }


    return {

        characters:
            characters.map(character => ({

                name:
                    character.name || "Character",

                description:
                    character.description || "",

                appearance:
                    character.appearance || "",

                clothing:
                    character.clothing || "",

                personality:
                    character.personality || ""

            })),

        globalRules: [

            "Use the same character identity in every scene.",

            "Never randomly change the face.",

            "Never randomly change the age.",

            "Never randomly change hairstyle.",

            "Never randomly change skin tone.",

            "Never randomly change clothing.",

            "Keep body proportions consistent.",

            "Maintain visual continuity from Scene 1 through Scene 30."

        ]

    };

}


// ==========================================
// BUILD ONE SCENE
// ==========================================

function buildScene(
    number,
    sceneType,
    story,
    aspectRatio,
    style,
    voice,
    characterBible
) {


    const characterNames =
        characterBible.characters
            .map(c => c.name)
            .join(", ");


    return {

        sceneNumber:
            number,

        sceneType:
            sceneType,

        duration:
            "10 seconds",

        aspectRatio:
            aspectRatio,

        visualPrompt:

            "Create Scene " +
            number +
            " from the original story. " +

            "Scene purpose: " +
            sceneType +
            ". " +

            "Story context: " +
            story +
            ". " +

            "Visual style: " +
            style +
            ". " +

            "Use cinematic composition, " +
            "natural lighting, detailed environment, " +
            "expressive faces and smooth natural movement. " +

            "Characters present: " +
            characterNames +
            ". " +

            "Maintain the exact character identity " +
            "defined in the Character Bible.",


        characterContinuity: {

            bible:
                characterBible,

            rule:
                "The same characters must look identical throughout all scenes."

        },


        narration:

            "Hindi narration for Scene " +
            number +
            ", written naturally for a children's story. " +
            "Keep the narration concise and suitable " +
            "for approximately 10 seconds.",


        dialogue:

            "Add short natural Hindi dialogue " +
            "only when appropriate for Scene " +
            number +
            ".",


        camera:

            "Use a cinematic camera movement appropriate " +
            "for the scene. Combine wide shots, medium shots " +
            "and close-ups where appropriate.",


        motion:

            "Smooth natural character movement, " +
            "natural blinking, facial expressions and " +
            "environmental motion.",


        sfx:

            "Rain, footsteps, wind, doors, objects, " +
            "environmental sounds or other suitable " +
            "cinematic sound effects according to the scene.",


        music:

            "Background music matching the emotional " +
            "tone of Scene " +
            number +
            ".",


        voice:

            voice,


        negativePrompt:

            "No random character replacement. " +
            "No face changes. " +
            "No age changes. " +
            "No hairstyle changes. " +
            "No clothing changes unless required by the story. " +
            "No watermark. " +
            "No unwanted text. " +
            "No subtitles."

    };

}


// ==========================================
// SERVER
// ==========================================

const PORT =
    process.env.PORT || 3000;


app.listen(PORT, () => {

    console.log(
        "AI Video Studio backend running on port " +
        PORT
    );

});
