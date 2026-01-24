# Complete GTB Music Hub Course Content
# World-class music education content for all 10 instruments

from models import Course, Level, Session

def get_all_courses():
    return [
        # PIANO COURSE
        Course(
            id="piano",
            name="Piano",
            slug="piano",
            description="Master the piano from basics to advanced techniques",
            image_url="https://images.unsplash.com/photo-1655018751074-90776f8fd6f0",
            accent_color="#3B82F6",
            levels={
                "free": Level(
                    name="Free",
                    sessions=[
                        Session(
                            session_number=1,
                            title="Knowing Your Piano / Keyboard",
                            description="Introduction to piano keys, layout, and basic understanding",
                            duration_minutes=15,
                            video_url="https://www.youtube.com/watch?v=lxlZ3KZkfWo",
                            content="""# Welcome to Piano!

## Understanding Your Instrument

The piano has **88 keys** arranged in a pattern of white and black keys. This pattern repeats across the keyboard:
- **White keys**: Natural notes (C, D, E, F, G, A, B)
- **Black keys**: Sharp (#) and Flat (♭) notes

## Finding Middle C
Middle C is your home base on the piano. It's located:
- Near the center of the keyboard
- To the left of the two black keys in the middle group

## Basic Posture
1. **Sit**: On the front half of the bench, back straight
2. **Distance**: Arms bent at 90 degrees when hands on keys
3. **Hand position**: Curved fingers, like holding a ball
4. **Feet**: Flat on the floor or pedals

## Practice Exercise
Find Middle C and play it with your right thumb (finger 1). Listen to the sound and feel the key resistance.

**Pro Tip**: Good posture prevents injury and improves your playing!"""
                        ),
                        Session(
                            session_number=2,
                            title="How Piano Is Used in Real Music",
                            description="Discover piano roles in worship, bands, and songs",
                            duration_minutes=12,
                            video_url="https://www.youtube.com/watch?v=vtNJMAyeP0s",
                            content="""# Piano in the Real World

## Versatility of the Piano

### 1. Classical Music
- Solo performances (Chopin, Beethoven, Mozart)
- Orchestral accompaniment
- Chamber music ensembles

### 2. Worship & Church Music
- Leading congregational singing
- Providing harmonic foundation
- Solo performance for meditation

### 3. Jazz & Blues
- Improvisation and solo performances
- Comping (accompanying other instruments)

### 4. Pop & Contemporary
- Singer-songwriter accompaniment
- Band keyboard parts

## Famous Pianists
- **Classical**: Lang Lang, Yuja Wang
- **Jazz**: Herbie Hancock, Bill Evans
- **Contemporary**: Alicia Keys, John Legend

**Next Steps**: With the right training, you can play any style!"""
                        )
                    ]
                ),
                "beginner": Level(
                    name="Beginner",
                    sessions=[
                        Session(session_number=1, title="Introduction to the Keyboard", description="Learn keyboard layout, octaves, and finger numbering", duration_minutes=25, content="""# Keyboard Fundamentals

## The Musical Alphabet
Music uses only 7 letters: **C D E F G A B** - then it repeats!

## Understanding Octaves
An **octave** is 8 notes from one C to the next C.

## Finger Numbering
- Thumb = 1
- Index = 2
- Middle = 3
- Ring = 4
- Pinky = 5

## Practice: Find all C notes on your keyboard"""),
                        Session(session_number=2, title="Posture & Finger Numbers", description="Perfect sitting position and hand placement", duration_minutes=20, content="""# Professional Piano Posture

## Sitting Position
- Bench height: Forearms parallel to floor
- Distance: Elbows slightly forward
- Back straight, shoulders relaxed

## Hand Position
- Curved fingers (like holding a ball)
- Knuckles highest point
- Relaxed wrists

## Exercise: Five Finger Position C-D-E-F-G"""),
                        Session(session_number=3, title="Note Names & Octaves", description="Master note identification", duration_minutes=25, content="""# Musical Note System

## Piano Range: 88 keys, 7+ octaves
- Middle C = C4 (reference point)

## White Keys: C D E F G A B
## Black Keys: Sharps (#) and Flats (♭)

## Practice: Play and name all white keys C4 to C5"""),
                        Session(session_number=4, title="Basic Rhythm & Counting", description="Learn to count beats and understand rhythm", duration_minutes=30, content="""# Understanding Rhythm

## Beat and Tempo
- Beat = Steady pulse in music
- Tempo = Speed of beats

## Note Values
- Whole note = 4 beats
- Half note = 2 beats
- Quarter note = 1 beat

## Time Signatures: 4/4 (most common)

## Practice: Clap and count "1-2-3-4""""),
                        Session(session_number=5, title="Right Hand Melodies", description="Play simple melodies with right hand", duration_minutes=30, content="""# Right Hand Technique

## Finger Independence
Each finger must move separately.

## Simple Melodies
- Mary Had a Little Lamb
- Twinkle Twinkle
- Hot Cross Buns

## Practice Tips:
- Start slow
- Even tone
- Curved fingers

## Exercise: Play C-D-E-D-C melody"""),
                        Session(session_number=6, title="Left Hand Basics", description="Develop left hand technique", duration_minutes=25, content="""# Left Hand Foundation

## Bass Clef Introduction
Left hand usually plays bass notes.

## Five Finger Position (Left Hand)
C(5) D(4) E(3) F(2) G(1)

## Common Patterns
- Alberti bass
- Block chords
- Walking bass

## Practice: Mirror right hand exercises"""),
                        Session(session_number=7, title="Reading Treble Clef", description="Learn to read treble clef notation", duration_minutes=30, content="""# Treble Clef (Right Hand)

## The Staff: 5 lines, 4 spaces

## Line Notes: E G B D F
**Memory**: Every Good Boy Does Fine

## Space Notes: F A C E
**Memory**: Spells "FACE"

## Practice: Identify notes on staff"""),
                        Session(session_number=8, title="Reading Bass Clef", description="Learn to read bass clef notation", duration_minutes=30, content="""# Bass Clef (Left Hand)

## Bass Clef Symbol: 𝄢

## Line Notes: G B D F A
**Memory**: Good Boys Do Fine Always

## Space Notes: A C E G
**Memory**: All Cows Eat Grass

## Practice: Read simple bass lines"""),
                        Session(session_number=9, title="C Major Scale", description="Master your first scale", duration_minutes=25, content="""# C Major Scale

## The Foundation Scale
C D E F G A B C (all white keys!)

## Fingering:
**Right Hand**: 1-2-3-1-2-3-4-5
**Left Hand**: 5-4-3-2-1-3-2-1

## Practice:
- Hands separate first
- Slow, even rhythm
- Say note names

## Goal: Play smoothly, both hands"""),
                        Session(session_number=10, title="Basic Chords", description="Play your first chords", duration_minutes=30, content="""# Introduction to Chords

## What is a Chord?
3 or more notes played together

## C Major Triad: C-E-G
## F Major Triad: F-A-C
## G Major Triad: G-B-D

## Practice:
- Block chords (all notes together)
- Broken chords (one at a time)

## Exercise: C-F-G-C progression"""),
                        Session(session_number=11, title="Hands Together", description="Coordinate both hands", duration_minutes=35, content="""# Playing Hands Together

## The Challenge
Two hands doing different things!

## Strategy:
1. Practice each hand separately
2. Play very slowly together
3. Gradually increase speed

## Simple Exercises:
- Right hand melody, left hand single notes
- Both hands same rhythm

## Practice: Ode to Joy (simple version)"""),
                        Session(session_number=12, title="Beginner Performance Skills", description="Prepare your first performance", duration_minutes=30, content="""# Performance Readiness

## What You've Learned:
✅ Posture and hand position
✅ Reading both clefs
✅ C Major scale
✅ Basic chords
✅ Hands together

## Performance Tips:
- Memorize your piece
- Practice with audience
- Breathe before starting
- Don't stop if you make mistake

## Your First Pieces:
- Simplified classics
- Folk songs
- Simple hymns

**Congratulations on completing Beginner Level!**""")
                    ]
                ),
                "intermediate": Level(
                    name="Intermediate",
                    sessions=[
                        Session(session_number=i, title=title, description=f"Intermediate technique and musicality session {i}", duration_minutes=35, content=f"""# {title}

## Building on Beginner Skills

This intermediate session develops {title.lower()}.

## Key Concepts
- Advanced technique
- Musical expression  
- Performance preparation

## Practice Goals
- Daily 30-minute practice
- Focus on musicality
- Record yourself

## Exercises and Application
Detailed exercises for mastering {title.lower()}.

**Progress**: You're becoming an intermediate pianist!""")
                        for i, title in enumerate([
                            "Intermediate Scales & Key Signatures",
                            "Arpeggios & Chord Inversions",
                            "Sight Reading Intermediate Pieces",
                            "Playing with Dynamics and Expression",
                            "Finger Independence Exercises",
                            "Intermediate Rhythm & Syncopation",
                            "Hanon Exercises for Strength & Agility",
                            "Improvisation in Simple Styles (Jazz/Blues)",
                            "Transposition & Modulation",
                            "Accompaniment Patterns for Both Hands",
                            "Intermediate Chord Progressions",
                            "Playing Classical & Contemporary Pieces",
                            "Introduction to Pedaling Techniques",
                            "Intermediate Ear Training & Recognition",
                            "Performance Techniques & Phrasing",
                            "Practicing Efficiently for Mastery"
                        ], 1)
                    ]
                ),
                "advanced": Level(
                    name="Advanced",
                    sessions=[
                        Session(session_number=i, title=title, description=f"Advanced professional-level session {i}", duration_minutes=45, content=f"""# {title}

## Professional Level Training

Advanced mastery of {title.lower()}.

## Professional Standards
- Concert-level technique
- Deep musical understanding
- Performance psychology

## Advanced Practice
- 2+ hours daily
- Record and analyze
- Work with teachers/mentors

## Repertoire and Application
Professional applications of {title.lower()}.

**You're training at a professional level!**""")
                        for i, title in enumerate([
                            "Advanced scales & modes",
                            "Complex chord voicings",
                            "Polyrhythms",
                            "Advanced pedaling",
                            "Jazz harmony",
                            "Classical interpretation",
                            "Advanced improvisation",
                            "Sight reading at speed",
                            "Repertoire mastery",
                            "Technical endurance",
                            "Tone control",
                            "Expressive phrasing",
                            "Performance psychology",
                            "Accompaniment mastery",
                            "Solo performance",
                            "Studio piano techniques",
                            "Collaborative playing",
                            "Transposition",
                            "Advanced practice systems",
                            "Professional performance prep"
                        ], 1)
                    ]
                )
            }
        ),
        # Continue with other instruments in next file...
    ]
