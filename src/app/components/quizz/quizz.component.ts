import { Component, OnInit } from '@angular/core';
import quiz_questions from '../../../assets/data/quizz_questions.json';

type Option = {
  id: number,
  name: string,
  alias: string
}

type Question = {
  id: number,
  question: string,
  options: Option[]
}

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  vilain: string
  hero: string
  title: string = ""
  questions: Question[] = []
  selectedQuestion?: Question
  answers: string[] = []
  currentQuestion: number
  lastQuestion: number
  finished: boolean
  constructor() {
    this.finished = false
    this.currentQuestion = 0
    this.lastQuestion = quiz_questions.questions
                                      .length ?? 0
    this.vilain = quiz_questions.results
                                .A ?? ""
    this.hero = quiz_questions.results
                              .B ?? ""
  }

  ngOnInit(): void {
    if (quiz_questions) {
      this.title = quiz_questions.title
      this.questions = quiz_questions.questions
      this.selectedQuestion = this.questions[this.currentQuestion]
    }
  }

  printResult(): string {
    return this.answers
                .filter(alias => alias === 'A')
                .length > this.answers
                              .filter(alias => alias === 'B')
                              .length ? this.vilain : this.hero
  }

  async playerChoice(choice: string) {
    this.answers
        .push(choice)
    if (this.answers
            .length === 5) {
      this.finished = true
      return
    }
    this.nextQuestion()
  }

  private nextQuestion() {
    this.currentQuestion += 1
    this.selectedQuestion = this.questions[this.currentQuestion]
  }
}
