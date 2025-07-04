import pytest
from core.agent import MediBookAgent

def test_process_input():
    agent = MediBookAgent()
    response = agent.process_input("I want to book an appointment", "en")
    assert "show_form" in response