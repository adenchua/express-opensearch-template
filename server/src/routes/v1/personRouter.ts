import express from "express";

import { addPerson, getPersons } from "../../controllers/v1/personController";

const router = express.Router();

router.get("/", getPersons);
router.post("/:name", addPerson);

export default { router };
