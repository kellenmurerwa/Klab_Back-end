import { CreateContact, getAllContact, getContactById,deleteContactById} from "../controllers/contactController.js";

import express from 'express';
const contactRouter = express();

contactRouter.post('/createContact', CreateContact);
contactRouter.get('/getAllContact', getAllContact);
contactRouter.get('/getContactById/:id', getContactById);
contactRouter.get('/deleteContactById/:id', deleteContactById);

export default contactRouter;

