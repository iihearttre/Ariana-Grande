
# Welcome to the Enhanced Python Learning Program!
# This program will guide you through various Python concepts step-by-step.
# Read the comments carefully, and you'll learn how to write and understand Python code.

# Import necessary libraries (if any are required for future expansions).
# In this case, no libraries are used, so we can skip this part.

# Define all the functions as before (see previous sections)...

# Function 1: Start the application
def start_application():
    """
    Function Purpose:
    - This function serves as the starting point of the program.
    - It greets the user with a friendly message and explains the purpose of the program.
    """
    print("\nWelcome to the Enhanced Python Learning Experience!")
    print("This program will guide you step-by-step through essential Python concepts.")
    print("Let's get started!")
    return True

# Function 2: Create a user profile
def create_user_profile():
    """
    Collects and validates user information, including their name, username, and passcode.
    Demonstrates string handling, loops, and input validation.
    """
    user_name = input("\nWhat is your name? ")
    print(f"Hello, {user_name}! Let's set up your account.")
    
    # Collect a valid username.
    while True:
        print("\nYour username must meet the following requirements:")
        print("- At least 6 characters long")
        print("- Contain at least one uppercase letter")
        username = input("Create a username: ")
        if len(username) >= 6 and any(char.isupper() for char in username):
            print(f"Great! Your username '{username}' is valid.")
            break
        else:
            print("Invalid username. Please try again.")
    
    # Collect a valid passcode.
    while True:
        try:
            passcode = int(input("Enter a 6-digit passcode: "))
            if 100000 <= passcode <= 999999:
                print("Passcode set successfully!")
                break
            else:
                print("Passcode must be exactly 6 digits. Please try again.")
        except ValueError:
            print("Invalid input. Please enter numeric digits only.")

    return user_name, username, passcode

# Function 3: Ask about hobbies
def ask_hobbies():
    """
    Collects and displays the user's hobbies, demonstrating lists and loops.
    """
    hobbies = []
    print("\nLet's talk about your hobbies!")
    print("Enter your hobbies one at a time. Type 'done' when you're finished.")
    while True:
        hobby = input("Enter a hobby: ")
        if hobby.lower() == 'done':
            break
        hobbies.append(hobby)
    print("\nHere are your hobbies:")
    for index, hobby in enumerate(hobbies, start=1):
        print(f"{index}. {hobby}")

# Function 4: Shopping quiz
def shopping_quiz():
    """
    Asks a series of yes/no questions and demonstrates decision-making structures.
    """
    questions = [
        "Do you prefer online shopping over in-store shopping?",
        "Do you value discounts and offers when shopping?",
        "Do you enjoy personalized recommendations?"
    ]
    answers = []
    for question in questions:
        while True:
            answer = input(question + " (yes/no): ").lower()
            if answer in ['yes', 'no']:
                answers.append(answer)
                break
            else:
                print("Invalid answer. Please type 'yes' or 'no'.")
    print("\nYour shopping preferences:")
    for index, answer in enumerate(answers, start=1):
        print(f"Question {index}: {answer}")

# Main function to control the flow of the program.
def main():
    """
    The main function serves as the central control point for the program.
    It calls the other functions in sequence to guide the user through the steps.
    """
    # Start the application by calling `start_application()`.
    if start_application():
        # Create the user profile.
        user_name, username, passcode = create_user_profile()
        
        # Display the collected user information for confirmation.
        print(f"\nThank you, {user_name}! Your profile has been set up.")
        print(f"Username: {username}")
        print(f"Passcode: {'*' * len(str(passcode))} (hidden for security!)")
        
        # Ask the user about their hobbies.
        ask_hobbies()
        
        # Conduct the shopping quiz.
        shopping_quiz()
        
        # End the program with a thank-you message.
        print("\nThank you for participating in the Tre's shopping program!")
        print("Keep practicing and have fun coding. Goodbye!")

# Trigger the main function.
if __name__ == "__main__":
    """
    This special block ensures the program only runs when executed directly
    (not when imported as a module in another program).
    """
    main()
