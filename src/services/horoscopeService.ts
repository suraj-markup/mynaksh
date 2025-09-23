import axios from 'axios';

export interface HoroscopeData {
  description: string;
  compatibility: string;
  mood: string;
  color: string;
  lucky_number: string;
  lucky_time: string;
  date_range: string;
  current_date: string;
}

// Mock data for development and fallback
const mockHoroscopeData: Record<string, HoroscopeData> = {
  aries: {
    description: "Today brings new opportunities for growth and adventure. Trust your instincts and take bold steps forward.",
    compatibility: "Leo",
    mood: "Energetic",
    color: "Red",
    lucky_number: "7",
    lucky_time: "2pm to 3pm",
    date_range: "Mar 21 - Apr 19",
    current_date: new Date().toDateString(),
  },
  taurus: {
    description: "Stability and comfort are your focus today. Take time to appreciate the simple pleasures in life.",
    compatibility: "Virgo",
    mood: "Calm",
    color: "Green",
    lucky_number: "4",
    lucky_time: "10am to 11am",
    date_range: "Apr 20 - May 20",
    current_date: new Date().toDateString(),
  },
  gemini: {
    description: "Communication flows easily today. Connect with others and share your ideas freely.",
    compatibility: "Aquarius",
    mood: "Social",
    color: "Yellow",
    lucky_number: "3",
    lucky_time: "6pm to 7pm",
    date_range: "May 21 - Jun 20",
    current_date: new Date().toDateString(),
  },
  cancer: {
    description: "Emotions run deep today. Trust your intuition and nurture your relationships.",
    compatibility: "Scorpio",
    mood: "Nurturing",
    color: "Silver",
    lucky_number: "2",
    lucky_time: "7pm to 8pm",
    date_range: "Jun 21 - Jul 22",
    current_date: new Date().toDateString(),
  },
  leo: {
    description: "Your natural leadership shines bright today. Step into the spotlight with confidence.",
    compatibility: "Aries",
    mood: "Confident",
    color: "Gold",
    lucky_number: "8",
    lucky_time: "12pm to 1pm",
    date_range: "Jul 23 - Aug 22",
    current_date: new Date().toDateString(),
  },
  virgo: {
    description: "Attention to detail serves you well today. Focus on perfecting your craft.",
    compatibility: "Taurus",
    mood: "Analytical",
    color: "Navy Blue",
    lucky_number: "6",
    lucky_time: "9am to 10am",
    date_range: "Aug 23 - Sep 22",
    current_date: new Date().toDateString(),
  },
  libra: {
    description: "Balance and harmony guide your decisions today. Seek beauty in all things.",
    compatibility: "Gemini",
    mood: "Balanced",
    color: "Pink",
    lucky_number: "9",
    lucky_time: "4pm to 5pm",
    date_range: "Sep 23 - Oct 22",
    current_date: new Date().toDateString(),
  },
  scorpio: {
    description: "Intensity and passion fuel your actions today. Embrace transformation.",
    compatibility: "Cancer",
    mood: "Intense",
    color: "Deep Red",
    lucky_number: "5",
    lucky_time: "11pm to 12am",
    date_range: "Oct 23 - Nov 21",
    current_date: new Date().toDateString(),
  },
  sagittarius: {
    description: "Adventure calls to you today. Expand your horizons and seek new experiences.",
    compatibility: "Aquarius",
    mood: "Adventurous",
    color: "Purple",
    lucky_number: "3",
    lucky_time: "3pm to 4pm",
    date_range: "Nov 22 - Dec 21",
    current_date: new Date().toDateString(),
  },
  capricorn: {
    description: "Discipline and hard work pay off today. Stay focused on your long-term goals.",
    compatibility: "Virgo",
    mood: "Determined",
    color: "Brown",
    lucky_number: "10",
    lucky_time: "8am to 9am",
    date_range: "Dec 22 - Jan 19",
    current_date: new Date().toDateString(),
  },
  aquarius: {
    description: "Innovation and originality are your superpowers today. Think outside the box.",
    compatibility: "Gemini",
    mood: "Innovative",
    color: "Electric Blue",
    lucky_number: "11",
    lucky_time: "5pm to 6pm",
    date_range: "Jan 20 - Feb 18",
    current_date: new Date().toDateString(),
  },
  pisces: {
    description: "Dreams and intuition guide you today. Let your imagination flow freely.",
    compatibility: "Cancer",
    mood: "Dreamy",
    color: "Sea Green",
    lucky_number: "12",
    lucky_time: "8pm to 9pm",
    date_range: "Feb 19 - Mar 20",
    current_date: new Date().toDateString(),
  },
};

// Aztro API service
const AZTRO_API_URL = 'https://aztro.sameerkumar.website/';

export const fetchHoroscope = async (sign: string): Promise<HoroscopeData> => {
  try {
    // Try to fetch from the actual API
    const response = await axios.post(`${AZTRO_API_URL}?sign=${sign}&day=today`);
    
    if (response.data) {
      return {
        description: response.data.description || '',
        compatibility: response.data.compatibility || '',
        mood: response.data.mood || '',
        color: response.data.color || '',
        lucky_number: response.data.lucky_number || '',
        lucky_time: response.data.lucky_time || '',
        date_range: response.data.date_range || '',
        current_date: response.data.current_date || new Date().toDateString(),
      };
    }
  } catch (error) {
    console.warn('Failed to fetch from Aztro API, using mock data:', error);
  }

  // Fallback to mock data
  const mockData = mockHoroscopeData[sign.toLowerCase()];
  if (mockData) {
    return mockData;
  }

  // Default fallback
  return {
    description: "The stars are aligned in your favor today. Stay positive and embrace new opportunities.",
    compatibility: "Unknown",
    mood: "Optimistic",
    color: "Blue",
    lucky_number: "1",
    lucky_time: "12pm to 1pm",
    date_range: "Unknown",
    current_date: new Date().toDateString(),
  };
};
