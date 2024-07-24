import { NextFunction, Request, Response } from "express";

import { createPerson, fetchPersons } from "../../services/personService";

export const addPerson = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name } = req.params;

  try {
    const response = await createPerson(name);
    res.status(201).send(response);
  } catch (error) {
    next(error);
  }
};

export const getPersons = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const persons = await fetchPersons();
    res.send(persons);
  } catch (error) {
    next(error);
  }
};
