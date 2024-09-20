import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('author-01')
    }, new UniqueEntityId('answer-01'))

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: 'author-01',
      answerId: newAnswer.id.toValue(),
      content: 'Conteúdo teste'
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      props: {
        title: 'Pergunta teste',
        content: 'Conteúdo teste'
      }
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('author-01')
    }, new UniqueEntityId('answer-01'))

    await inMemoryAnswersRepository.create(newAnswer)

    expect(async () => await sut.execute({
      authorId: 'author-02',
      answerId: 'answer-01',
      content: 'Conteúdo teste'
    })).rejects.toBeInstanceOf(Error)
  })
})
