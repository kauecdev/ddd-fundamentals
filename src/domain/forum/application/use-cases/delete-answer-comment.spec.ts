import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete Answer Comment Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to delete a answer comment', async () => {
    const answer = makeAnswerComment()

    await inMemoryAnswerCommentsRepository.create(answer)

    await sut.execute({
      answerCommentId: answer.id.toString(),
      authorId: answer.authorId.toString(),
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete another user answer comment', async () => {
    const answer = makeAnswerComment({
      authorId: new UniqueEntityId('author-01'),
    })

    await inMemoryAnswerCommentsRepository.create(answer)

    expect(
      async () =>
        await sut.execute({
          answerCommentId: answer.id.toString(),
          authorId: 'author-02',
        })
    ).rejects.toBeInstanceOf(Error)
  })
})
