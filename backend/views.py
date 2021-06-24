from flask import Blueprint, request, jsonify
from backend import db
from datetime import datetime
from .models import ChannelModel, MessageModel, UserModel
from flask_jwt_extended import jwt_required

views = Blueprint('views', __name__)

@views.route('/new-message', methods=['POST'])
@jwt_required()
def new_message():
    if request.method == 'POST':
        channel_id = request.json['channel_id']
        user_id = request.json['user_id']
        text = request.json['text']
        date = datetime.now()

        db.session.add(MessageModel(channel_id, user_id, text, date))
        db.session.commit()
        return jsonify(success="Message added")
    return jsonify(success="Messages returned")

@jwt_required()
@views.route('/messages', methods=['POST'])
def messages():
    if request.method == 'POST':
        channel_id = request.json['channel_id']
        messages = MessageModel.query.filter_by(channel_id=channel_id).all()
        message_list = []
        for message in messages:
            message_list.append({
                'user': get_user(message.user_id),
                'text': message.text,
                'date': message.date
            })
        return jsonify({
            'messages': message_list
        })

@views.route('/channels', methods=['GET', 'POST'])
@jwt_required()
def channels():
    if request.method == 'POST':
        channel = request.json['channel']
        return add_channel(channel)
    return get_channels()

@views.route('/user', methods=['POST'])
@jwt_required()
def user():
    if(request.method == 'POST'):
        id = request.json['id']
        return jsonify(get_user(id))

def add_channel(channel):
    if ChannelModel.query.filter_by(name=channel).first() != None:
        return jsonify(
            error="A channel with that name already exists"
        )
    db.session.add(ChannelModel(channel))
    db.session.commit()
    return jsonify(
        success="channel added"
    )

def get_channels():
    channels = ChannelModel.query.order_by(ChannelModel.name).all()
    channel_list = []
    for channel in channels:
        channel_list.append({
            'id': channel.id,
            'name': channel.name
        })
    return jsonify({"channels": channel_list})

def get_user(id):
    user = UserModel.query.filter_by(id=id).first()
    return {
        'id': user.id,
        'firstname': user.firstname,
        'lastname': user.lastname
    }