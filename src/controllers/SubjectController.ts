import { Request, Response } from 'express';
import { subjectRepository } from '../repositories/SubjectRepository';

export class SubjectController {
	async createSubject(req: Request, res: Response): Promise<void> {
		const { name } = req.body;	

		try {
			const newSubject = subjectRepository.create({ name });

			await subjectRepository.save(newSubject);

			res.status(201).json(newSubject);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}

	async getAllSubjects(req: Request, res: Response): Promise<void> {
		try {
			const subjects = await subjectRepository.find({ relations: ['rooms'] });

			res.status(200).json(subjects);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}

	async getSubjectwithRooms(req: Request, res: Response): Promise<void> {
		
		try {
			const subject = await subjectRepository.find({  relations: ['rooms'] });

			if (!subject) {
				res.status(404).json({ message: 'Subject not found' });
				return;
			}

			res.status(200).json(subject);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}

	async deleteSubject(req: Request, res: Response): Promise<void> {
		const { id } = req.params;

		try {
			const subject = await subjectRepository.findOne({where: { id: Number(id) }});

			if (!subject) {
				res.status(404).json({ message: 'Subject not found' });
				return;
			}

			await subjectRepository.remove(subject);

			res.status(204).send();
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}
}