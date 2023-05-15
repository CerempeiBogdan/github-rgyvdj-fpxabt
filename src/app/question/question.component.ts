import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  public name: string = "";
  public questionList: any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  correctAnswer: number = 0;
  inCorrectAnswer: number = 0;
  progress: string = "0";
  isQuizCompleted : boolean = false;
  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
  }
  getAllQuestions() {
    this.questionService.getQuestionJson()
      .subscribe(res => {
        this.questionList = res.questions;
      })
  }

  answer(currentQno: number, option: any) {

    if(currentQno === this.questionList.length){
      this.isQuizCompleted = true;
    }
    if (option.correct) {
      this.points += 10;
      this.correctAnswer++;
      setTimeout(() => {
        this.currentQuestion++;
      }, 250);


    } else {
      setTimeout(() => {
        this.currentQuestion++;
        this.inCorrectAnswer++;
      }, 250);
      this.points -= 5;
    }
  }

  resetQuiz() {
    this.getAllQuestions();
    this.points = 0;
    this.currentQuestion = 0;
    this.progress = "0";
  }
}
