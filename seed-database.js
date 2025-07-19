const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_ANON_KEY'
);

// Realistic names for dummy data
const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Christopher', 'Karen', 'Charles', 'Nancy', 'Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony', 'Helen', 'Mark', 'Sandra', 'Donald', 'Donna', 'Steven', 'Carol', 'Paul', 'Ruth', 'Andrew', 'Sharon', 'Joshua', 'Michelle', 'Kenneth', 'Laura', 'Kevin', 'Emily', 'Brian', 'Kimberly', 'George', 'Deborah', 'Edward', 'Dorothy'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'];

// Generate 50 realistic voters
const generateDummyVoters = () => {
  const voters = [];
  
  for (let i = 0; i < 50; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const birthYear = Math.floor(Math.random() * (2006 - 1940) + 1940); // Ages 18-84
    const gender = Math.random() > 0.5 ? 'M' : 'F';
    const ward = Math.floor(Math.random() * 5) + 1; // Wards 1-5
    const precinct = String(Math.floor(Math.random() * 20) + 1).padStart(3, '0'); // Precincts 001-020
    const isActive = Math.random() > 0.2; // 80% active voters
    
    // Generate voting history (more realistic pattern)
    const voteHistory = [];
    for (let j = 0; j < 4; j++) {
      if (isActive && Math.random() > 0.3) { // Active voters more likely to vote
        voteHistory.push(true);
      } else {
        voteHistory.push(false);
      }
    }
    
    voters.push({
      birth_year: birthYear,
      gender: gender,
      voter_precinct: precinct,
      ward: String(ward),
      congressional_district: 'MO-02',
      legislative_district: 'MO-064',
      senate_district: 'MO-023',
      registration_date: new Date(2015 + Math.floor(Math.random() * 9), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      township: 'Wentzville',
      assigned_highschool: 'Wentzville High',
      assigned_middleschool: 'Wentzville Middle',
      assigned_elementaryschool: 'Wentzville Elementary',
      neighborhood: ['Heritage', 'Liberty', 'Progress', 'Unity', 'Freedom'][Math.floor(Math.random() * 5)],
      is_active: isActive,
      vote_history_1: voteHistory[0],
      vote_history_2: voteHistory[1],
      vote_history_3: voteHistory[2],
      vote_history_4: voteHistory[3]
    });
  }
  
  return voters;
};

const dummyVoters = generateDummyVoters();

async function seedDatabase() {
  console.log('🌱 Seeding database with 50 realistic voter records...');
  
  try {
    // Clear existing data first
    const { error: deleteError } = await supabase
      .from('voters')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all records
    
    if (deleteError) {
      console.log('Note: Could not clear existing data:', deleteError.message);
    } else {
      console.log('✅ Cleared existing voter data');
    }
    
    // Insert new dummy data
    const { data, error } = await supabase
      .from('voters')
      .insert(dummyVoters);

    if (error) {
      console.error('❌ Error seeding database:', error);
    } else {
      console.log('✅ Successfully seeded database with', dummyVoters.length, 'voters');
      console.log('📊 Data includes:');
      console.log('   - Various age groups (18-84 years old)');
      console.log('   - Gender distribution');
      console.log('   - 5 different wards');
      console.log('   - 20 different precincts');
      console.log('   - Realistic voting patterns');
      console.log('   - 80% active voters, 20% inactive');
    }
  } catch (err) {
    console.error('❌ Failed to seed database:', err);
  }
}

// Run the seeding
seedDatabase(); 