import { TechniqueModel } from '../../common/models/technique';

export interface TechniquesStoreModel {
    techniques: TechniqueModel[];
    playlist: number[];
    techniqueFilter: string;
}
