import e, { Request, Response } from 'express'
import { roomRepository } from '../repositories/RoomRepository'
import { subjectRepository } from '../repositories/SubjectRepository'

export class RoomController {
    async createRoom(req: Request, res: Response): Promise<void> {
        const { name, description } = req.body;

        try {
            const newRoom = roomRepository.create({ name, description });
            await roomRepository.save(newRoom);
            res.status(201).json(newRoom);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getRoom(req: Request, res: Response): Promise<void> {
        try {
            const rooms = await roomRepository.find({ relations: ['subjects'] });
            res.status(200).json(rooms);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async roomSubject(req: Request, res: Response): Promise<void> {
        const { subeject_id } = req.body;
        const { room_id } = req.params;

        if (!room_id) {
            res.status(400).json({ message: 'Invalid room ID' });
            return;
        }

        if (!subeject_id) {
            res.status(400).json({ message: 'Invalid subject ID' });
            return;
        }

        try {
            // Buscando a sala e logando o resultado
            const room = await roomRepository.findOne({ where: { id: Number(room_id) }, relations: ['subjects'] });

            if (!room) {
                res.status(404).json({ message: 'Room not found' });
                return;
            }

            // Buscando a matéria
            const subeject = await subjectRepository.findOne({ where: { id: Number(subeject_id) } });

            if (!subeject) {
                res.status(404).json({ message: 'Subject not found' });
                return;
            }

            // Adicionando a matéria à sala
            room.subjects.push(subeject);
            await roomRepository.save(room);
            res.status(200).json(room);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
