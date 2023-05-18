const express = require("express");
const { v4: uuid } = require("uuid");
const cors = require("cors");
const port = 8000;

const app = express();
app.use(express.json());
app.use(cors());

const validateFields = (req) => {
    const requredFields = ["temperature", "unit", "date", "city"];
    const missingFields = requredFields.filter(
        (field) => {
            if (field === "temperature" && req.body[field] === 0) return false;
            return !req.body[field]
        }
    );
    return missingFields;
};

const sanitizeFields = (req) => {
    const fields = ["temperature", "unit", "date", "city"];
    //extract only the fields we want from req.body
    const sanitizedFields = fields.reduce((acc, field) => {
        acc[field] = req.body[field];
        return acc;
    }, {});
    return sanitizedFields;
};

const db = {
    reports: [
        {
            id: "29242699-5914-4a00-b1ac-1e0113a7a802",
            temperature: 270,
            unit: "K",
            date: "2022-01-01",
            city: "London",
        },
        {
            id: "b58798e7-eca4-4bb0-8e93-d595067092c7",
            temperature: 100,
            unit: "F",
            date: "2021-02-11",
            city: "Los Angeles",
        },
        {
            id: "c96ce0d0-3601-4aab-801f-9b6ab410d0ca",
            temperature: 300,
            unit: "K",
            date: "2021-07-12",
            city: "New York",
        },
        {
            id: "1f9acf11-6985-48d6-9d57-9ecde66c6f9b",
            temperature: 23,
            unit: "C",
            date: "2021-08-07",
            city: "Paris",
        },
        {
            id: "af107633-1eda-4a2b-a9ef-989a117dae57",
            temperature: 310,
            unit: "K",
            date: "2019-08-08",
            city: "Tokyo",
        },
    ],
};

app.get("/api/reports", async (req, res) => {
    res.json(db.reports);
});

app.get("/api/reports/:report_id", async (req, res) => {
    if (!req.params.report_id) {
        res.status(400).json({ error: "Report id is required" });
        return;
    }

    const report = db.reports.find(
        (report) => report.id === req.params.report_id
    );

    if (!report) {
        res.status(404).send("Report not found");
    }

    res.json(report);
});

app.post("/api/reports", async (req, res) => {
    const missingFields = validateFields(req);

    if (!req.body || missingFields.length > 0) {
        res.status(400).send("The following fields are required: " + missingFields.join(", "));
        return;
    }
    const sanitizedFields = sanitizeFields(req);

    db.reports.push({
        id: uuid(),
        ...sanitizedFields,
    });

    res.json(db.reports);
});

app.put("/api/reports/:report_id", async (req, res) => {
    if (!req.params.report_id) {
        res.status(400).json({ error: "Report id is required" });
        return;
    }

    const missingFields = validateFields(req);

    if (!req.body || missingFields.length > 0) {
        res.status(400).send("The following fields are required: " + missingFields.join(", "));
        return;
    }

    const reportIndex = db.reports.findIndex(
        (report) => report.id === req.params.report_id
    );

    if (reportIndex === -1) {
        res.status(404).send("Report not found");
        return;
    }

    const report = { ...db.reports[reportIndex], ...sanitizeFields(req) };

    db.reports[reportIndex] = report;
    res.json(db.reports);
});

app.delete("/api/reports/:report_id", async (req, res) => {
    db.reports = db.reports.filter(
        (report) => report.id !== req.params.report_id
    );
    res.status(200).send("Report deleted");
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
