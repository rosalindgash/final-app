from django.test import TestCase
import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient

# Create your tests here.

@pytest.mark.django_db
class TestHealthCheck:
    def test_health_check_endpoint(self):
        """Test that the health check endpoint returns a 200 status code."""
        client = APIClient()
        url = reverse('health-check')
        response = client.get(url)
        
        assert response.status_code == status.HTTP_200_OK
        assert response.json() == {'status': 'healthy'}
