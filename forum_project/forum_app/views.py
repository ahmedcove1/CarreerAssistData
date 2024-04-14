from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
import json

class QuestionnaireAPIView(APIView):
    """
    API view to handle requests for the questionnaire.
    """
    def post(self, request, *args, **kwargs):
        # For now, just echo back the data sent in the request
        return Response(data=request.data, status=status.HTTP_200_OK)



def index(request):
    return render(request, 'forum_app/index.html')  # Make sure the path is correct



def submit_questionnaire(request):
    if request.method == 'POST':
        # Your logic here, e.g., processing form data
        received_data = json.loads(request.body)

        response_data = {
            "status": "success",
            "echoedData": received_data
        }
        return JsonResponse(response_data)


def result(request):
    return render(request, 'forum_app/result_page.html')