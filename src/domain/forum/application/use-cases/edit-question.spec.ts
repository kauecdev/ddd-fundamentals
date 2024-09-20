import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-01')
    }, new UniqueEntityId('question-01'))

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author-01',
      questionId: newQuestion.id.toValue(),
      title: 'Pergunta teste',
      content: 'Conteúdo teste'
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      props: {
        title: 'Pergunta teste',
        content: 'Conteúdo teste'
      }
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-01')
    }, new UniqueEntityId('question-01'))

    await inMemoryQuestionsRepository.create(newQuestion)

    expect(async () => await sut.execute({
      authorId: 'author-02',
      questionId: 'question-01',
      title: 'Pergunta teste',
      content: 'Conteúdo teste'
    })).rejects.toBeInstanceOf(Error)
  })
})
