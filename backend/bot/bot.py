# import logging
from aiogram import Bot, Dispatcher, types
from aiogram.contrib.fsm_storage.memory import MemoryStorage
from aiogram import executor
from aiogram.types import ReplyKeyboardMarkup, KeyboardButton, ReplyKeyboardRemove
from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters import Command
from aiogram.dispatcher.filters.state import State, StatesGroup
import requests
# logging.basicConfig(level=logging.INFO)

# Initialize bot and dispatcher
bot = Bot(token="6249441057:AAGLwVEBe-OLZCHZ9XGZw6dTKvCRGgaXTYk")
storage = MemoryStorage()
dp = Dispatcher(bot, storage=storage)


class UserState(StatesGroup):
    ISUSER = State() 
    SIGNUP = State()
    GETTING_NAME = State()
    VALIDATION = State()
    ACTION = State()


@dp.message_handler(commands=['start'])
async def start_command(message: types.Message, state: FSMContext):
    await UserState.ISUSER.set()
    greeting_message = "🌟 Welcome to Anime Play Bot! 🌟\n\n"
    greeting_message += "I'm here to provide you with information about new series and movies added to our anime website. 🎉\n\n"
    greeting_message += "📚 Explore our extensive collection of series and movies and stay up-to-date with the latest releases. 💫\n\n"
    greeting_message += "🎥 From popular ongoing series to classic movies, we have it all! Let me assist you in finding your next anime adventure. 🌸\n\n"
    greeting_message += "📢 Feel free to ask me anything related to anime, and I'll do my best to provide you with the information you need. 💬\n\n"
    greeting_message += "To get started, you can use the following commands:\n\n"
    greeting_message += "📺 /series - View the latest series added.\n"
    greeting_message += "🎬 /movies - View the latest movies added.\n"
    greeting_message += "❓ /help - Get help and instructions.\n\n\n"
    greeting_message2 = "So, are you a website user or just hanging around?"
    keyboard = ReplyKeyboardMarkup(row_width=2, resize_keyboard=True)
    buttons = [KeyboardButton(text="i'm User"), KeyboardButton(text="Just chillin")]
    keyboard.add(*buttons)

    await bot.send_message(message.chat.id, greeting_message)
    await bot.send_message(message.chat.id, greeting_message2, reply_markup=keyboard)


@dp.message_handler(state=UserState.ISUSER)
async def handle_choices(message: types.Message, state: FSMContext):
    # Process user's choice
    if message.text == "i'm User":
        await UserState.GETTING_NAME.set()
        keyboard_remove = ReplyKeyboardRemove()
        await message.answer("Cool man! What is your username at AnimePlay?", reply_markup=keyboard_remove)
        print(state.current_state())
    elif message.text == 'Just chillin':
        await UserState.SIGNUP.set()

        keyboard = ReplyKeyboardMarkup(row_width=2, resize_keyboard=True)
        buttons = [KeyboardButton(text="Sign Up"), KeyboardButton(text="Later")]
        keyboard.add(*buttons)
        await message.answer("Oh, don't worry, you can sign up immediately :)", reply_markup=keyboard)
    # Reset state
    await state.finish()



@dp.message_handler(state=UserState.SIGNUP)
async def handle_new_user(message: types.Message, state: FSMContext):
    await message.answer('Okay, send me your name: ')


@dp.message_handler(state=UserState.GETTING_NAME)
async def handle_username(message: types.Message, state: FSMContext):
    username =  message.text
    response = requests.get(f'http://127.0.0.1:8000/api/users/?username={username}').json()

    # Store the username in the context

    # Retrieve the username from the context

    if response:
        await UserState.VALIDATION.set()
        await state.update_data(password=response[0]['password'])
        await state.update_data(username=response[0]['username'])
        await message.answer(f"Hello {response[0]['username']}! \n\nPlease enter your password:")
        print(state.current_state())
        await state.finish()
    else: 
        await message.answer(f"Cannot find user with username: {username}! \n\nPlease try again:")



    # Reset state



@dp.message_handler(state=UserState.VALIDATION)
async def handle_password(message: types.Message, state: FSMContext):
    password = message.text 
    data = await state.get_data()
    stored_username = data.get('username')
    stored_paassword = data.get('password')
    logged = data.get('logged')
    
    if message.text == 'News':
        news = requests.get('http://127.0.0.1:8000/api/news/').json()
        for i in news[:10]: 
            text = f'''#{i['id']}:\n\nTitle: {i['intro']}\nText:{i['title']}'''
            await message.answer(text)

    elif message.text == 'Profile':
        user = requests.get(f'http://127.0.0.1:8000/api/users/?username={stored_username}').json()[0]
        text = f'''id: {user['id']}\nusername: {user['username']}\nemail: {user['email']}\nphone: {user['phone_number']}\ndate of birth: {user['date_of_birth']}\nbalance: {user['balance']}\ncarma: {user['carma']}'''
        await message.answer(text)

    elif message.text == 'Collections':
        response = requests.get(f'http://127.0.0.1:8000/api/collections').json()
        for i in response:
            movies = [x['title_rus'] for x in i['movies']]
            text = f"id: {i['id']}\nname: {i['name']}\nmovies: {movies}"
            await message.answer(text)
            

    if str(password) == str(stored_paassword):
        keyboard = ReplyKeyboardMarkup(row_width=2, resize_keyboard=True)
        buttons = [KeyboardButton(text="News"), KeyboardButton(text="Collections"), KeyboardButton('Profile')]
        keyboard.add(*buttons)
        await state.update_data(logged=True)
        await message.answer(f"Welcome {stored_username}! \n\n", reply_markup=keyboard)
        # print(state.current_state())
        # await UserState.ACTION.set()
    elif not logged and (str(password) != str(stored_paassword)): 
        keyboard = ReplyKeyboardMarkup(row_width=2, resize_keyboard=True)
        buttons = [KeyboardButton(text="Cancel")]
        keyboard.add(*buttons)
        await message.answer(f"Password is incorrect! \n\nTry again!", reply_markup=keyboard)

 


        



# @dp.message_handler(state=UserState.ACTION)
# async def handle_password(message: types.Message, state: FSMContext):
#     action = message.text
#     print(message.text)

#     if action == 'News':
#         await message.answer(f'You have chosen News!')



if __name__ == '__main__':
    executor.start_polling(dp, skip_updates=True)
