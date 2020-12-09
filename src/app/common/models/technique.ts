import { MediaModel } from './media';
import { TechniqueSetModel } from './technique-set';
import { QuestionModel } from './question.model';

export interface TechniqueModel {
    title: string;
    id: number;
    description: string;
    grade: number;
    techniqueSet: TechniqueSetModel;
    media: MediaModel[];
    tags: number[];
    isUnwatched: boolean;
    isAvailable: boolean;
    isFavourite: boolean;
    questions: QuestionModel[];
    createdAt: Date;
    updatedAt: Date;
}
