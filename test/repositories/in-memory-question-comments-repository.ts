import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = this.items.find(
      questionComment => questionComment.id.toString() === id
    )

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const itemToDeleteIndex = this.items.findIndex(
      item => item.id === questionComment.id
    )

    this.items.splice(itemToDeleteIndex, 1)
  }
}
