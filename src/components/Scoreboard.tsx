import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Score {
    id: string;
    player_name: string;
    score: number;
    created_at: string;
}

export const Scoreboard: React.FC = () => {
    const [scores, setScores] = useState<Score[]>([]);

    useEffect(() => {
        const fetchScores = async () => {
            const { data } = await supabase
              .from('scores')
              .select('*')
              .order('score', { ascending: false })
              .limit(10);

              if (data) {
                setScores(data);
              }
        };

        fetchScores();

        const subscription = supabase
          .channel('scores')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'scores', }, fetchScores)
          .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <div className="bg-gray-800 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">Top 10 Scores</h2>
            <div className="space-y-2">
                {scores.map((score, index) => (
                    <div
                      key={score.id}
                      className="flex justify-between items-center bg-gray-700 p-2 rounded"
                    >
                        <span className="text-white">
                            {index + 1}. {score.player_name}
                        </span>
                        <span className="text-yellow-400 font-bold">{score.score}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
