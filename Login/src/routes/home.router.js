import express from 'express';

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        res.render("index");
    } catch (error) {
        console.log(error);
        res.render("Error");
        return;
    }
});

export default router;