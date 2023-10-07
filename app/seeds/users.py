from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', firstName='Demo', lastName='Lition', aboutMe='I am but a humble demo user looking for a place to call my own', imageUrl='https://firebasestorage.googleapis.com/v0/b/applause-ce1e3.appspot.com/o/images%2F0809-GJ-StreetPerformers-RonnieElliott-JazzGuitarist-2-WilliamCrooks-1-modified.png6dfd4a33-16e9-48fd-88e9-140d422b0c6f?alt=media&token=422be58d-29f3-4617-850b-8a495d6a2eb4')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', firstName='Marnie', lastName='jahosephite', aboutMe='I am so hungry I could eat entire stable right now', imageUrl='https://firebasestorage.googleapis.com/v0/b/applause-ce1e3.appspot.com/o/images%2F0809-GJ-StreetPerformers-RonnieElliott-JazzGuitarist-2-WilliamCrooks-1-modified.png6dfd4a33-16e9-48fd-88e9-140d422b0c6f?alt=media&token=422be58d-29f3-4617-850b-8a495d6a2eb4')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', firstName='Bobbie', lastName='clarence', aboutMe='I am truly just looking for a fun experience I can share with my friends at summer camp.', imageUrl="https://firebasestorage.googleapis.com/v0/b/applause-ce1e3.appspot.com/o/images%2F0809-GJ-StreetPerformers-RonnieElliott-JazzGuitarist-2-WilliamCrooks-1-modified.png6dfd4a33-16e9-48fd-88e9-140d422b0c6f?alt=media&token=422be58d-29f3-4617-850b-8a495d6a2eb4")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
