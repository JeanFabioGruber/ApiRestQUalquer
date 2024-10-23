import { Router } from "express";
import { SubjectController } from "./controllers/SubjectController";
import { RoomController } from "./controllers/RoomController";
import { VideoController } from "./controllers/videoController";


const subjectController = new SubjectController();
const roomController = new RoomController();
const videoController = new VideoController;


const routes = Router();

//rotas do subject
routes.post('/subject',  subjectController.createSubject);
routes.get('/subject',  subjectController.getAllSubjects);
routes.delete('/subject/:id',  subjectController.deleteSubject);
routes.get('/subjectWithRooms',  subjectController.getSubjectwithRooms);

//rotas do room
routes.post('/room',  roomController.createRoom);
routes.get('/room',  roomController.getRoom);
routes.post('/room/:room_id/subject',  roomController.roomSubject);

//rotas do video
routes.post('/video/:id',  videoController.createVideo);
routes.get('/video',  videoController.getVideo);


export default routes;