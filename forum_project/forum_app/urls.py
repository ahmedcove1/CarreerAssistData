from django.urls import path
from .views import index, QuestionnaireAPIView
from .views import submit_questionnaire,result

urlpatterns = [
    path('', index, name='index'),
    path('questionnaire/', QuestionnaireAPIView.as_view(), name='questionnaire-api'),
    path('submit_questionnaire/', submit_questionnaire, name='submit_questionnaire'),
    path('result/', result, name='result'),

]
