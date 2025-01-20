import './App.css'
import mock from './mock-data.json'

const data = mock as WeekEntry[];

type Rating = 0 | 1 | 2 | 3 | 4 | 5;

interface WeekEntry {
    title?: string;              // Optional title of what you did this week
    "start-date": string;        // The start date (Monday of the week) in 'YYYY-MM-DD' format
    "end-date": string;          // The end date (Sunday of the week) in 'YYYY-MM-DD' format
    content: string[];           // List of bullet points (tasks/events done during the week)
    rating: Rating;              // Rating from 0 to 5
};

function App() {
    return (
        <ul>
            {
                data.map((item, index) => {
                    const formatted_start = new Date(item['start-date']).toLocaleDateString('en-US', {
                        month: 'short', // 'short' for abbreviated month name (e.g., "Feb")
                        day: 'numeric'  // Numeric day (e.g., "24")
                    });
                    const formatted_end = new Date(item['end-date']).toLocaleDateString('en-US', {
                        month: 'short', // 'short' for abbreviated month name (e.g., "Feb")
                        day: 'numeric'  // Numeric day (e.g., "24")
                    });

                    return (
                        <li key={index}>
                            <h2>{item.title}</h2>
                            <p>{formatted_start} - {formatted_end}</p>
                            <p>rating: {item.rating}</p>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default App
