import {Video} from '../entities/Video'
import { AppDataSource } from '../data-source'

export const videoRespository = AppDataSource.getRepository(Video);