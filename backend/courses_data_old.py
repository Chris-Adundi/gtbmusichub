# GTB Music Hub Course Data
# This file contains all course structures with sessions

from models import Course, Level, Session

def get_all_courses():
    return [
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
                        Session(session_number=1, title="Knowing Your Piano / Keyboard", description="Introduction to piano keys, layout, and basic understanding", content="Welcome to the world of piano! In this session..."),
                        Session(session_number=2, title="How Piano Is Used in Real Music", description="Discover piano roles in worship, bands, and songs", content="The piano is one of the most versatile instruments...")
                    ]
                ),
                "beginner": Level(
                    name="Beginner",
                    sessions=[
                        Session(session_number=i, title=title, description=f"Beginner session {i}", content=f"Content for session {i}")
                        for i, title in enumerate([
                            "Introduction to the Keyboard", "Posture & Finger Numbers", "Note Names & Octaves",
                            "Basic Rhythm & Counting", "Right Hand Melodies", "Left Hand Basics",
                            "Reading Treble Clef", "Reading Bass Clef", "C Major Scale",
                            "Basic Chords", "Hands Together", "Beginner Performance Skills"
                        ], 1)
                    ]
                ),
                "intermediate": Level(
                    name="Intermediate",
                    sessions=[
                        Session(session_number=i, title=title, description=f"Intermediate session {i}", content=f"Content for session {i}")
                        for i, title in enumerate([
                            "Intermediate Scales & Key Signatures", "Arpeggios & Chord Inversions",
                            "Sight Reading Intermediate Pieces", "Playing with Dynamics and Expression",
                            "Finger Independence Exercises", "Intermediate Rhythm & Syncopation",
                            "Hanon Exercises for Strength & Agility", "Improvisation in Simple Styles (Jazz/Blues)",
                            "Transposition & Modulation", "Accompaniment Patterns for Both Hands",
                            "Intermediate Chord Progressions", "Playing Classical & Contemporary Pieces",
                            "Introduction to Pedaling Techniques", "Intermediate Ear Training & Recognition",
                            "Performance Techniques & Phrasing", "Practicing Efficiently for Mastery"
                        ], 1)
                    ]
                ),
                "advanced": Level(
                    name="Advanced",
                    sessions=[
                        Session(session_number=i, title=title, description=f"Advanced session {i}", content=f"Content for session {i}")
                        for i, title in enumerate([
                            "Advanced scales & modes", "Complex chord voicings", "Polyrhythms",
                            "Advanced pedaling", "Jazz harmony", "Classical interpretation",
                            "Advanced improvisation", "Sight reading at speed", "Repertoire mastery",
                            "Technical endurance", "Tone control", "Expressive phrasing",
                            "Performance psychology", "Accompaniment mastery", "Solo performance",
                            "Studio piano techniques", "Collaborative playing", "Transposition",
                            "Advanced practice systems", "Professional performance prep"
                        ], 1)
                    ]
                )
            }
        ),
        Course(
            id="guitar",
            name="Guitar",
            slug="guitar",
            description="Learn guitar from first chords to advanced soloing",
            image_url="https://images.unsplash.com/photo-1619558041249-0523903712e1",
            accent_color="#EF4444",
            levels={
                "free": Level(
                    name="Free",
                    sessions=[
                        Session(session_number=1, title="Knowing Your Guitar", description="Guitar parts, strings, and basic understanding", content="Welcome to guitar learning..."),
                        Session(session_number=2, title="How Guitar Is Used in Real Music", description="Guitar roles in different music genres", content="The guitar is incredibly versatile...")
                    ]
                ),
                "beginner": Level(name="Beginner", sessions=[Session(session_number=i, title=f"Beginner Session {i}", description="", content="") for i in range(1, 13)]),
                "intermediate": Level(name="Intermediate", sessions=[Session(session_number=i, title=f"Intermediate Session {i}", description="", content="") for i in range(1, 17)]),
                "advanced": Level(name="Advanced", sessions=[Session(session_number=i, title=f"Advanced Session {i}", description="", content="") for i in range(1, 21)])
            }
        ),
        Course(
            id="drums",
            name="Drums",
            slug="drums",
            description="Master rhythm, coordination, and drumming techniques",
            image_url="https://images.unsplash.com/photo-1571327073757-71d13c24de30",
            accent_color="#F59E0B",
            levels={
                "free": Level(name="Free", sessions=[Session(session_number=i, title=f"Free Session {i}", description="", content="") for i in range(1, 3)]),
                "beginner": Level(name="Beginner", sessions=[Session(session_number=i, title=f"Beginner Session {i}", description="", content="") for i in range(1, 13)]),
                "intermediate": Level(name="Intermediate", sessions=[Session(session_number=i, title=f"Intermediate Session {i}", description="", content="") for i in range(1, 17)]),
                "advanced": Level(name="Advanced", sessions=[Session(session_number=i, title=f"Advanced Session {i}", description="", content="") for i in range(1, 21)])
            }
        ),
        Course(
            id="saxophone",
            name="Saxophone",
            slug="saxophone",
            description="Learn saxophone from first notes to jazz improvisation",
            image_url="https://images.unsplash.com/photo-1751831091483-dfa578888e32",
            accent_color="#10B981",
            levels={
                "free": Level(name="Free", sessions=[Session(session_number=i, title=f"Free Session {i}", description="", content="") for i in range(1, 3)]),
                "beginner": Level(name="Beginner", sessions=[Session(session_number=i, title=f"Beginner Session {i}", description="", content="") for i in range(1, 13)]),
                "intermediate": Level(name="Intermediate", sessions=[Session(session_number=i, title=f"Intermediate Session {i}", description="", content="") for i in range(1, 17)]),
                "advanced": Level(name="Advanced", sessions=[Session(session_number=i, title=f"Advanced Session {i}", description="", content="") for i in range(1, 21)])
            }
        ),
        Course(
            id="trumpet",
            name="Trumpet",
            slug="trumpet",
            description="Master trumpet technique and performance",
            image_url="https://images.unsplash.com/photo-1615841192234-b773038eee7f",
            accent_color="#EC4899",
            levels={
                "free": Level(name="Free", sessions=[Session(session_number=i, title=f"Free Session {i}", description="", content="") for i in range(1, 3)]),
                "beginner": Level(name="Beginner", sessions=[Session(session_number=i, title=f"Beginner Session {i}", description="", content="") for i in range(1, 13)]),
                "intermediate": Level(name="Intermediate", sessions=[Session(session_number=i, title=f"Intermediate Session {i}", description="", content="") for i in range(1, 17)]),
                "advanced": Level(name="Advanced", sessions=[Session(session_number=i, title=f"Advanced Session {i}", description="", content="") for i in range(1, 21)])
            }
        ),
        Course(
            id="violin",
            name="Violin",
            slug="violin",
            description="Learn violin from basics to concert performance",
            image_url="https://images.unsplash.com/photo-1767998569881-003f30728849",
            accent_color="#6366F1",
            levels={
                "free": Level(name="Free", sessions=[Session(session_number=i, title=f"Free Session {i}", description="", content="") for i in range(1, 3)]),
                "beginner": Level(name="Beginner", sessions=[Session(session_number=i, title=f"Beginner Session {i}", description="", content="") for i in range(1, 13)]),
                "intermediate": Level(name="Intermediate", sessions=[Session(session_number=i, title=f"Intermediate Session {i}", description="", content="") for i in range(1, 17)]),
                "advanced": Level(name="Advanced", sessions=[Session(session_number=i, title=f"Advanced Session {i}", description="", content="") for i in range(1, 21)])
            }
        ),
        Course(
            id="voice",
            name="Voice and Harmony",
            slug="voice",
            description="Develop your voice and master harmony singing",
            image_url="https://images.unsplash.com/photo-1561446289-4112a4f79116",
            accent_color="#EC4899",
            levels={
                "free": Level(name="Free", sessions=[Session(session_number=i, title=f"Free Session {i}", description="", content="") for i in range(1, 3)]),
                "beginner": Level(name="Beginner", sessions=[Session(session_number=i, title=f"Beginner Session {i}", description="", content="") for i in range(1, 13)]),
                "intermediate": Level(name="Intermediate", sessions=[Session(session_number=i, title=f"Intermediate Session {i}", description="", content="") for i in range(1, 17)]),
                "advanced": Level(name="Advanced", sessions=[Session(session_number=i, title=f"Advanced Session {i}", description="", content="") for i in range(1, 21)])
            }
        ),
        Course(
            id="production",
            name="Music Production",
            slug="production",
            description="Create, arrange, and produce professional music",
            image_url="https://images.unsplash.com/photo-1598847873329-ed1608fb858b",
            accent_color="#10B981",
            levels={
                "free": Level(name="Free", sessions=[Session(session_number=i, title=f"Free Session {i}", description="", content="") for i in range(1, 3)]),
                "beginner": Level(name="Beginner", sessions=[Session(session_number=i, title=f"Beginner Session {i}", description="", content="") for i in range(1, 13)]),
                "intermediate": Level(name="Intermediate", sessions=[Session(session_number=i, title=f"Intermediate Session {i}", description="", content="") for i in range(1, 17)]),
                "advanced": Level(name="Advanced", sessions=[Session(session_number=i, title=f"Advanced Session {i}", description="", content="") for i in range(1, 21)])
            }
        ),
        Course(
            id="theory",
            name="Music Theory",
            slug="theory",
            description="Understand the language of music",
            image_url="https://images.unsplash.com/photo-1762008510357-90b8c10d53ea",
            accent_color="#6366F1",
            levels={
                "free": Level(name="Free", sessions=[Session(session_number=i, title=f"Free Session {i}", description="", content="") for i in range(1, 3)]),
                "beginner": Level(name="Beginner", sessions=[Session(session_number=i, title=f"Beginner Session {i}", description="", content="") for i in range(1, 13)]),
                "intermediate": Level(name="Intermediate", sessions=[Session(session_number=i, title=f"Intermediate Session {i}", description="", content="") for i in range(1, 17)]),
                "advanced": Level(name="Advanced", sessions=[Session(session_number=i, title=f"Advanced Session {i}", description="", content="") for i in range(1, 21)])
            }
        ),
        Course(
            id="sound_engineering",
            name="Sound Engineering",
            slug="sound_engineering",
            description="Master live sound and studio recording",
            image_url="https://images.unsplash.com/photo-1615268734097-12b6b02ca8ff",
            accent_color="#F59E0B",
            levels={
                "free": Level(name="Free", sessions=[Session(session_number=i, title=f"Free Session {i}", description="", content="") for i in range(1, 3)]),
                "beginner": Level(name="Beginner", sessions=[Session(session_number=i, title=f"Beginner Session {i}", description="", content="") for i in range(1, 13)]),
                "intermediate": Level(name="Intermediate", sessions=[Session(session_number=i, title=f"Intermediate Session {i}", description="", content="") for i in range(1, 17)]),
                "advanced": Level(name="Advanced", sessions=[Session(session_number=i, title=f"Advanced Session {i}", description="", content="") for i in range(1, 21)])
            }
        )
    ]