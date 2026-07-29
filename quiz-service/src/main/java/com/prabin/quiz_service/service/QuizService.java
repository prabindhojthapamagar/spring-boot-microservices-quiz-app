package com.prabin.quiz_service.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import com.prabin.quiz_service.dao.QuizDao;
import com.prabin.quiz_service.feign.QuizInterface;

import com.prabin.quiz_service.model.QuestionWrapper;
import com.prabin.quiz_service.model.Quiz;
import com.prabin.quiz_service.model.Response;

@Service
public class QuizService {

	@Autowired 
	QuizDao quizDao;
	
	@Autowired
	QuizInterface quizInterface;
	
	
	
	public ResponseEntity<String> createQuiz(String category, int numQ, String title) {
		
		List<Integer> questions = quizInterface.getQuestionsForQuiz(category, numQ).getBody();

		Quiz quiz = new Quiz();
		quiz.setTitle(title);
		quiz.setQuestionIds(questions);
		quizDao.save(quiz);
		
		return new ResponseEntity<>("Created a quiz", HttpStatus.CREATED);
	}
	
	
	
	

	public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(Integer id) {
		
		Quiz quiz = quizDao.findById(id).get();
		
		List<Integer> questionIds = quiz.getQuestionIds();
		
		ResponseEntity<List<QuestionWrapper>> questionsForUser = quizInterface.getQuestionsFromId(questionIds);
		
		return questionsForUser;
	}

	
	
	
	
	public ResponseEntity<Integer> calculateResult(Integer id, List<Response> responses) {
		
		ResponseEntity<Integer> score = quizInterface.getScore(responses);
		
		return score;
	}

}
