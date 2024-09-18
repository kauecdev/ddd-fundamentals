import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionsRepository: QuestionsRepository = {
  create: async (answer: Question) => {
    return
  },
}

describe('Create Question Use Case', () => {
  it('should create a question', async () => {
    const createQuestionUseCase = new CreateQuestionUseCase(
      fakeQuestionsRepository
    )

    const { question } = await createQuestionUseCase.execute({
      authorId: '1',
      title: 'Nova pergunta',
      content: 'Conteúdo da pergunta',
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual('Nova resposta')
  })
})
