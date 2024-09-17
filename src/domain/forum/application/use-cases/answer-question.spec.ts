import { Answer } from '../forum/enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return
  },
}

describe('Answer Question Use Case', () => {
  it('should create an answer', async () => {
    const answerQuestionUseCase = new AnswerQuestionUseCase(
      fakeAnswersRepository
    )

    const answer = await answerQuestionUseCase.execute({
      questionId: '1',
      instructorId: '1',
      content: 'Nova resposta',
    })

    expect(answer.content).toEqual('Nova resposta')
  })
})
