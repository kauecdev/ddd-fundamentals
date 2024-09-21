import { makeQuestion } from 'test/factories/make-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { makeAnswer } from 'test/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Question Answers Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswerRepository)
  })

  it('should be able to fetch question answers', async () => {
    await inMemoryAnswerRepository.create(makeAnswer({ questionId: new UniqueEntityId('question-01')}))
    await inMemoryAnswerRepository.create(makeAnswer({ questionId: new UniqueEntityId('question-01')}))
    await inMemoryAnswerRepository.create(makeAnswer({ questionId: new UniqueEntityId('question-01')}))

    const { answers } = await sut.execute({
      questionId: 'question-01',
      page: 1
    })

    expect(answers).toHaveLength(3)
  })

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerRepository.create(makeAnswer({ questionId: new UniqueEntityId('question-01')}))
    }

    const { answers } = await sut.execute({
      questionId: 'question-01',
      page: 2
    })

    expect(answers).toHaveLength(2)
  })
})
