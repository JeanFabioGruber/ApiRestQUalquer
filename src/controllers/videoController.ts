import { Request, Response } from 'express'
import { videoRespository } from '../repositories/VideoRepository'
import { roomRepository } from '../repositories/RoomRepository';

export class VideoController {
    async createVideo(req: Request, res: Response): Promise<void> {
        const { title, url } = req.body;
        const { id } = req.params;

        try {
            const room = await roomRepository.findOneBy({ id: Number(id) });
            if (!room) {
                res.status(404).json({ message: 'Room not found' });
                return;
            }
            const newVideo = videoRespository.create({ title, url, room });
            await videoRespository.save(newVideo);
            res.status(201).json(newVideo);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async getVideo(req: Request, res: Response): Promise<void> {
        try {
            const videos = await videoRespository.find({ relations: ['room'] });
            res.status(200).json(videos);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async deleteVideo(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const video = await videoRespository.findOne({where: { id: Number(id) }});

            if (!video) {
                res.status(404).json({ message: 'Video not found' });
                return;
            }

            await videoRespository.remove(video);

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}