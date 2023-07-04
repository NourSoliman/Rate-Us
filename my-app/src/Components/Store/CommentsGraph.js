import React from 'react';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell, Legend, Tooltip, Label } from 'recharts';

const CommentsGraph = () => {
    const comments = useSelector((state) => state.store.comments) || [];
    const commentStatusCounts = {
        Recommended: 0,
        NotRecommended: 0,
        'Solved-Case': 0,
    };

    comments.forEach((comment) => {
        commentStatusCounts[comment.status]++;
    });

    // Prepare the data for the chart
    const chartData = Object.entries(commentStatusCounts).map(([status, count]) => ({
        name: status,
        value: count,
    }));

    // Define the colors for each status
    const COLORS = ['#27ae60', '#e74c3c', '#3498db'];

    // Custom label formatter function
    const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor="middle"
                dominantBaseline="central"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className='commentGraphContainer'>
            <h3 className="comments-header">Comment Status Distribution</h3>
            <div>
                <PieChart width={400} height={400}>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={renderLabel}
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value, { percent }) => [`${value}`, `${(percent * 100).toFixed(2)}%`]} />
                    <Legend align="center" verticalAlign="bottom" layout="horizontal" />
                    <style>{`
                    .recharts-pie-label-line {
                        display: none !important;
                    }
                `}</style>
                </PieChart>
            </div>
        </div>
    );
};

export default CommentsGraph;
