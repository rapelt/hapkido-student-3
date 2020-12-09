export interface QuestionModel {
    id: number;
    t_id: number;
    hb_id: string;
    student: string;
    replay_id: number | null;
    question_text: string;
    createdAt: Date;
    likes: string[];
}
