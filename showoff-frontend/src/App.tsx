import { useParams, useNavigate  } from 'react-router';
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

export function App() {
    const navigate = useNavigate();
    
    return (
        <ul className="week-list">
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
                        <li key={index} onClick={() => navigate(`/${index}`)}>
                            <h2>{item.title}</h2>
                            <span className="date">{formatted_start} - {formatted_end}</span>
                            <div className="rating">
                                {[...Array(item.rating)].map((index) => (
                                    <span key={index} />
                                ))}
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export function WeekPage() {
    const params = useParams();
    const week = data[Number(params.week)];

    return (
        <div>
            <h1>{week.title}</h1>
            <span>{week['start-date']} - {week['end-date']}</span>
            <ul>
                {week.content.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}
