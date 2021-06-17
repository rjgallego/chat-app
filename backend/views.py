from flask import Blueprint, request, jsonify
from backend import db
from datetime import datetime
from .models import ChannelModel, MessageModel

views = Blueprint('views', __name__)

@views.route('/messages', methods=['GET', 'POST'])
def messages():
    if request.method == 'POST':
        channel_id = request.json['channel_id']
        user_id = request.json['user_id']
        text = request.json['text']
        date = datetime.now()

        db.session.add(MessageModel(channel_id, user_id, text, date))
        db.session.commit()
        return jsonify(success="Message added")
    return jsonify(success="Messages returned")

@views.route('/channels', methods=['GET', 'POST'])
def channels():
    if request.method == 'POST':
        channel = request.json['channel']
        return add_channel(channel)
    return get_channels()

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
    