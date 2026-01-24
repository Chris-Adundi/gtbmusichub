# GTB Music Hub - Admin Guide

## Accessing the Admin Panel

### Step 1: Register as Admin
When you register your account, your role will be set to 'admin' in the database. To make an existing user an admin:

1. Connect to MongoDB:
```bash
mongosh
use gtb_music_hub
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

2. After setting admin role, you'll see the "🔧 Admin Panel" button in your dashboard navigation

### Step 2: Navigate to Admin Panel
- **URL**: http://localhost:3000/admin
- **Access**: Click "🔧 Admin Panel" button from dashboard (only visible to admins)

## Admin Panel Features

### 1. Course Management
**Left Panel - Course List**
- View all 10 courses
- Click any course to view its content
- Color-coded by instrument

**Courses Available:**
- Piano (Blue)
- Guitar (Red)
- Drums (Orange)
- Saxophone (Green)
- Trumpet (Pink)
- Violin (Purple)
- Voice & Harmony (Pink)
- Music Production (Green)
- Music Theory (Purple)
- Sound Engineering (Orange)

### 2. Session Browser
**Middle Panel - Session List**
- Switch between levels: Free, Beginner, Intermediate, Advanced
- View all sessions for selected level
- See which sessions have videos attached (📹 icon)
- Click any session to edit

### 3. Content Editor
**Right Panel - Session Editor**
- **Title**: Session name (e.g., "Introduction to Piano Keys")
- **Description**: Brief summary of the session
- **YouTube Video URL**: Paste full YouTube URL for tutorials
- **Duration**: Session length in minutes
- **Content**: Full lesson content (Markdown supported)

### Content Editing Tips

#### Finding Quality YouTube Videos
1. Search for: "[Instrument] [Topic] tutorial"
2. Filter by: "Creative Commons" license when possible
3. Prefer: Short videos (5-15 minutes)
4. Choose: Clear audio, professional instruction

**Example Searches:**
- "piano posture tutorial"
- "guitar finger exercises beginner"
- "drum rudiments basic"
- "saxophone embouchure guide"

#### Content Structure (World-Class Standard)
```markdown
# Session Title

## Introduction
Brief overview of what students will learn

## Key Concepts
- Point 1: Explanation
- Point 2: Explanation
- Point 3: Explanation

## Practical Exercises
### Exercise 1: Name
Step-by-step instructions

### Exercise 2: Name
Step-by-step instructions

## Practice Tips
- Tip 1
- Tip 2
- Tip 3

## Common Mistakes to Avoid
❌ Mistake 1: Why it's wrong
✅ Correct approach

## Pro Tips
Advanced insights for better learning

**Practice Goal**: Specific daily practice recommendation
```

## Content Quality Standards

### World-Class Music Education Includes:
1. **Clear Learning Objectives**: What students will achieve
2. **Step-by-Step Progression**: Logical skill building
3. **Visual/Audio References**: YouTube videos for demonstration
4. **Practical Exercises**: Hands-on practice activities
5. **Common Pitfalls**: What to avoid and why
6. **Professional Tips**: Insights from expert musicians
7. **Assessment**: How students know they've mastered it

### Session Content Guidelines

#### Free Sessions (2 per course)
- **Purpose**: Introduction and motivation
- **Length**: 10-15 minutes
- **Content**: Basic overview, instrument anatomy, inspiration
- **Video**: Overview of instrument and its uses

#### Beginner Level (12 sessions)
- **Focus**: Fundamentals and proper technique
- **Covers**: Posture, reading music, basic theory, simple pieces
- **Progression**: Very gradual, lots of repetition
- **Videos**: Technique demonstrations, simple song tutorials

#### Intermediate Level (16 sessions)
- **Focus**: Building fluency and musicality
- **Covers**: Scales, chord progressions, sight reading, styles
- **Progression**: Moderate challenge, introducing complexity
- **Videos**: Technique refinement, genre-specific tutorials

#### Advanced Level (20 sessions)
- **Focus**: Professional-level mastery
- **Covers**: Advanced harmony, improvisation, performance
- **Progression**: Challenging, preparing for professional work
- **Videos**: Master class content, advanced techniques

## YouTube Video Integration

### How to Add Videos
1. Find appropriate tutorial on YouTube
2. Copy full URL (e.g., https://www.youtube.com/watch?v=ABC123)
3. Paste in "YouTube Video URL" field
4. Video will be embedded in learning session

### Video Selection Criteria
✅ **Good Videos:**
- Clear audio and video quality
- Professional instruction
- Appropriate length (5-20 minutes)
- Focused on specific skill
- Suitable for target level

❌ **Avoid:**
- Poor quality recordings
- Overly long videos (>30 min)
- Unrelated content
- Inappropriate language
- Copyright violations

### Recommended YouTube Channels by Instrument

**Piano:**
- Piano TV
- Josh Wright Piano TV
- HDpiano

**Guitar:**
- JustinGuitar
- Marty Music
- GuitarLessons365Song

**Drums:**
- Drumeo
- Stephen Taylor
- Mike Johnston

**Saxophone:**
- BetterSax
- McGill Music Sax School

**Music Theory:**
- 12tone
- Music Theory Guy
- Adam Neely

## Managing Course Content

### Current Status
- **Total Courses**: 10
- **Total Sessions**: 480 (across all courses and levels)
- **Content Status**: Development phase
- **Videos**: To be added per session

### Priority Content Development

**Phase 1 (High Priority):**
1. Complete all Free sessions (engaging intro content)
2. Add video URLs for all Free sessions
3. Complete Beginner level for Piano (most popular)
4. Add videos for Beginner Piano

**Phase 2 (Medium Priority):**
1. Complete Beginner for Guitar, Drums, Voice
2. Add videos for these beginners levels
3. Start Intermediate content for popular courses

**Phase 3 (Long-term):**
1. Complete all Intermediate sessions
2. Complete all Advanced sessions
3. Add specialty content and bonus materials

## Content Backup and Version Control

### Saving Content
Currently, content edits are NOT automatically saved to the database. This is a safety feature during development.

**To Save Edits:**
1. Copy your content from the editor
2. Save to a local text file
3. Backend integration for saving will be added

### Exporting Content
You can export all course content:
```bash
# From MongoDB
mongosh
use gtb_music_hub
db.courses.find().pretty() > courses_backup.json
```

## Student Progress Tracking

### Viewing Student Data
Admin can view (future feature):
- Total registered users
- Active subscriptions
- Course enrollment numbers
- Session completion rates
- Payment history

### Analytics Dashboard
Coming soon:
- Most popular courses
- Average completion rates
- Student engagement metrics
- Revenue tracking

## M-Pesa Payment Testing

### Test Phone Number
Your configured M-Pesa number: **+254702641920**

### Testing Payments
1. Go to /subscription page
2. Select Individual or Organization plan
3. Choose M-Pesa payment method
4. Enter test number: 254702641920
5. You'll receive STK push on your phone
6. Enter M-Pesa PIN to complete

### M-Pesa Configuration
In `/app/backend/.env`:
```
MPESA_CONSUMER_KEY=your_key_from_safaricom
MPESA_CONSUMER_SECRET=your_secret_from_safaricom
CALLBACK_URL=https://your-domain.com/api/webhook/mpesa
```

## Stripe Payment Testing

### Test Cards
Use these for testing Stripe payments:
- **Success**: 4242 4242 4242 4242
- **Requires 3D Secure**: 4000 0025 0000 3155
- **Declined**: 4000 0000 0000 9995

**Expiry**: Any future date
**CVC**: Any 3 digits
**ZIP**: Any 5 digits

## Best Practices for Content Creation

### 1. Student-Centered Approach
- Write as if speaking to the student directly
- Use encouraging, supportive language
- Explain "why" not just "how"
- Connect to real music applications

### 2. Progressive Difficulty
- Each session builds on previous ones
- Introduce one new concept at a time
- Review previous concepts regularly
- Challenge without overwhelming

### 3. Multiple Learning Styles
- **Visual**: Images, diagrams, videos
- **Auditory**: Audio examples, listening exercises
- **Kinesthetic**: Hands-on exercises, playing

### 4. Professional Standards
- Accurate music terminology
- Proper notation conventions
- Industry-standard techniques
- Real-world applications

## Support and Resources

### Getting Help
- Technical issues: Check logs at `/var/log/supervisor/`
- Content questions: Reference world-class_content.py examples
- Database queries: Use MongoDB shell

### Useful Commands
```bash
# Restart backend after changes
sudo supervisorctl restart backend

# View backend logs
tail -f /var/log/supervisor/backend.err.log

# Check database
mongosh
use gtb_music_hub
db.users.find().pretty()
```

## Next Steps for Content Development

1. **Review Current Content**: Check world_class_content.py for Piano examples
2. **Create Content Plan**: Map out priority courses and sessions
3. **Source Videos**: Find and test YouTube tutorials
4. **Write Content**: Follow templates and standards
5. **Test Student Flow**: Register test account, go through sessions
6. **Gather Feedback**: Get input from real students
7. **Iterate**: Continuously improve based on feedback

---

**Remember**: Quality content is what makes GTB Music Hub world-class. Take time to create comprehensive, encouraging, and professionally-sound lessons!
