import React, { useState } from 'react';
import { useAgeMode } from '../context/AgeModeContext';
import { useTranslation } from '../i18n';
import { MOCK_BADGES, MOCK_EDUCATOR_ROSTER, MOCK_FAMILY_SUMMARY, StudentRosterItem } from '../data/mock-data';
import { BadgeItem } from '../types';
import { Button } from '../components/primitives/Button';
import { Card } from '../components/primitives/Card';
import { VisualAlert } from '../components/primitives/VisualAlert';
import {
  Award,
  Star,
  Download,
  Table as TableIcon,
  BarChart,
} from 'lucide-react';

export const ProgressPage: React.FC = () => {
  const { role, isKids } = useAgeMode();
  const { t } = useTranslation();

  const [showDataTable, setShowDataTable] = useState<boolean>(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const accuracyData = [
    { day: 'Day 1', acc: 72 },
    { day: 'Day 2', acc: 75 },
    { day: 'Day 3', acc: 70 },
    { day: 'Day 4', acc: 81 },
    { day: 'Day 5', acc: 84 },
    { day: 'Day 6', acc: 79 },
    { day: 'Day 7', acc: 88 },
    { day: 'Day 8', acc: 86 },
    { day: 'Day 9', acc: 91 },
    { day: 'Day 10', acc: 89 },
  ];

  const handleExportCsv = () => {
    // PROTOTYPE: CSV export stub for educator roster
    setExportNotice('Export complete: class_roster_fsl_progress.csv downloaded (mock).');
  };

  return (
    <div className="space-y-6 pb-24 max-w-2xl mx-auto">
      {/* Page Title */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-title-adaptive font-black text-text-primary tracking-tight">
            {role === 'educator'
              ? t('progress.educatorTab')
              : role === 'family'
              ? t('progress.familyTab')
              : t('progress.learnerTab')}
          </h2>
          <p className="text-body-adaptive text-text-secondary">
            Viewing metrics for: <span className="font-bold text-brand-blue uppercase tracking-tighter">{role}</span>
          </p>
        </div>

        {role === 'educator' && (
          <Button variant="secondary" onClick={handleExportCsv} className="text-caption-adaptive shadow-low">
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>{t('progress.exportCsv')}</span>
          </Button>
        )}
      </div>

      {exportNotice && (
        <VisualAlert
          type="success"
          title="CSV Exported"
          message={exportNotice}
          onClose={() => setExportNotice(null)}
        />
      )}

      {/* ========================================================
          ROLE 1: EDUCATOR VIEW
         ======================================================== */}
      {role === 'educator' && (
        <div className="space-y-5">
          {/* Class Summary KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-surface-card pad-adaptive-control rounded-card border-adaptive shadow-low">
              <div className="text-caption-adaptive text-text-secondary">Enrolled Students</div>
              <div className="text-title-adaptive font-bold text-text-primary">8</div>
            </div>
            <div className="bg-surface-card pad-adaptive-control rounded-card border-adaptive shadow-low">
              <div className="text-caption-adaptive text-text-secondary">Avg Accuracy</div>
              <div className="text-title-adaptive font-bold text-brand-blue">81%</div>
            </div>
            <div className="bg-surface-card pad-adaptive-control rounded-card border-adaptive shadow-low">
              <div className="text-caption-adaptive text-text-secondary">Scenarios Completed</div>
              <div className="text-title-adaptive font-bold text-brand-green">26</div>
            </div>
            <div className="bg-surface-card pad-adaptive-control rounded-card border-adaptive shadow-low">
              <div className="text-caption-adaptive text-text-secondary">Active Today</div>
              <div className="text-title-adaptive font-bold text-brand-orange">5</div>
            </div>
          </div>

          {/* Accessible Student Roster Table */}
          <Card className="overflow-x-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-body-adaptive text-text-primary">
                {t('progress.rosterTableCaption')}
              </h3>
              <span className="text-caption-adaptive text-text-secondary">6 active records</span>
            </div>

            <table className="w-full text-left text-body-adaptive border-collapse">
              <caption className="sr-only">{t('progress.rosterTableCaption')}</caption>
              <thead>
                <tr className="border-b border-adaptive text-caption-adaptive text-text-secondary">
                  <th scope="col" className="pb-2 font-bold">Student</th>
                  <th scope="col" className="pb-2 font-bold">Level</th>
                  <th scope="col" className="pb-2 font-bold">Accuracy</th>
                  <th scope="col" className="pb-2 font-bold">Avg Time</th>
                  <th scope="col" className="pb-2 font-bold">Done</th>
                  <th scope="col" className="pb-2 font-bold">Focus Area</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-adaptive">
                {MOCK_EDUCATOR_ROSTER.map((st: StudentRosterItem) => (
                  <tr key={st.id} className="hover:bg-surface-app transition">
                    <td className="py-2.5 font-bold text-text-primary">{st.name}</td>
                    <td className="py-2.5">Lvl {st.level}</td>
                    <td className="py-2.5 font-bold tabular-nums">
                      <span className={st.accuracy >= 80 ? 'text-brand-green' : 'text-brand-orange'}>
                        {st.accuracy}%
                      </span>
                    </td>
                    <td className="py-2.5 tabular-nums">{st.avgTimeSeconds}s</td>
                    <td className="py-2.5 tabular-nums">{st.scenariosDone}</td>
                    <td className="py-2.5">
                      <span className="bg-warning-surface text-on-warning-surface px-2 py-0.5 rounded-pill text-caption-adaptive font-medium">
                        {st.weakSign.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {/* ========================================================
          ROLE 2: FAMILY VIEW
         ======================================================== */}
      {role === 'family' && (
        <div className="space-y-4">
          <Card className="bg-brand-yellow/15 border-brand-yellow pad-adaptive-control space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-brand-yellow text-on-brand-yellow flex items-center justify-center text-3xl">
                👦
              </div>
              <div>
                <h3 className="text-title-adaptive font-extrabold text-text-primary">
                  {MOCK_FAMILY_SUMMARY.childName}’s Sign Journey
                </h3>
                <p className="text-body-adaptive text-text-secondary">
                  {MOCK_FAMILY_SUMMARY.weeklyStars} Stars earned this week · {MOCK_FAMILY_SUMMARY.streakDays} Day Streak!
                </p>
              </div>
            </div>

            <div className="bg-surface-card p-3 rounded-control border-adaptive text-body-adaptive">
              <span className="font-bold text-brand-blue">Home Practice Idea: </span>
              <span>{MOCK_FAMILY_SUMMARY.recommendedHomeActivity}</span>
            </div>

            <div className="text-caption-adaptive text-text-secondary flex items-center gap-1.5">
              <Star className="w-4 h-4 text-brand-orange fill-brand-yellow" aria-hidden="true" />
              <span>{MOCK_FAMILY_SUMMARY.nextMilestone}</span>
            </div>
          </Card>

          <Card>
            <h4 className="font-bold text-body-adaptive mb-2">Recent Signs Learned at Home</h4>
            <div className="flex flex-wrap gap-2">
              {MOCK_FAMILY_SUMMARY.recentSignsLearned.map((sign: string) => (
                <span key={sign} className="px-3 py-1 bg-surface-app rounded-pill border-adaptive font-bold text-brand-blue">
                  {sign.toUpperCase()} ✓
                </span>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* ========================================================
          ROLE 3: LEARNER VIEW (Default)
         ======================================================== */}
      {role === 'learner' && (
        <div className="space-y-6">
          {/* Accuracy Graph with Text Summary & Table Alternative */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-subtitle-adaptive font-bold text-text-primary">
                  10-Day Accuracy Trajectory
                </h3>
                <p className="text-caption-adaptive text-text-secondary">
                  Visual graph with high contrast tokens & pattern indicators
                </p>
              </div>

              <Button
                variant="ghost"
                onClick={() => setShowDataTable(!showDataTable)}
                aria-label="Toggle Data Table View"
                className="text-caption-adaptive"
              >
                {showDataTable ? <BarChart className="w-4 h-4" /> : <TableIcon className="w-4 h-4" />}
                <span>{showDataTable ? 'Show Chart' : 'Show Table'}</span>
              </Button>
            </div>

            {/* Text Summary for Screen Readers & Clarity */}
            <div
              className="p-3 bg-surface-app rounded-control border-adaptive text-caption-adaptive"
              aria-label="Chart text summary"
            >
              <span className="font-bold">Text Summary: </span>
              <span>{t('progress.chartSummaryAccuracy')}</span>
            </div>

            {/* Visual Bar Chart */}
            {!showDataTable ? (
              <div className="space-y-4 pt-2" aria-hidden="true">
                <div className="flex items-end justify-between gap-1.5 h-40 p-4 bg-surface-app rounded-control border-adaptive">
                  {accuracyData.map((d) => (
                    <div key={d.day} className="flex-1 flex flex-col items-center h-full justify-end group">
                      <div
                        className="w-full bg-brand-blue rounded-t-sm transition-all duration-base group-hover:bg-brand-orange"
                        style={{ height: `${d.acc}%` }}
                        title={`${d.day}: ${d.acc}%`}
                      />
                      <span className="text-micro font-bold text-text-primary mt-1.5 tracking-tighter truncate w-full text-center">
                        {d.acc}%
                      </span>
                      <span className="text-[10px] text-text-secondary mt-0.5 tracking-tighter truncate w-full text-center">
                        {d.day.replace('Day ', 'D')}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-caption-adaptive text-text-secondary">
                  <span>Day 1</span>
                  <span>Day 10</span>
                </div>
              </div>
            ) : (
              /* Accessible HTML Table Alternative */
              <div className="overflow-x-auto">
                <table className="w-full text-left text-body-adaptive border-collapse">
                  <caption className="sr-only">10-Day Sign Accuracy Table</caption>
                  <thead>
                    <tr className="border-b border-adaptive text-caption-adaptive text-text-secondary">
                      <th scope="col" className="pb-1 font-bold">Session Day</th>
                      <th scope="col" className="pb-1 font-bold">Accuracy (%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-adaptive">
                    {accuracyData.map((d) => (
                      <tr key={d.day}>
                        <td className="py-1.5 text-text-primary font-medium">{d.day}</td>
                        <td className="py-1.5 text-text-primary tabular-nums font-bold">{d.acc}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          {/* Gamification Badges Grid */}
          <section aria-labelledby="badges-heading" className="space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-brand-orange" aria-hidden="true" />
              <h3 id="badges-heading" className="text-subtitle-adaptive font-bold text-text-primary">
                {t('progress.badgesTitle')} (8 Badges)
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {MOCK_BADGES.map((b: BadgeItem) => (
                <div
                  key={b.id}
                  className={`p-3.5 rounded-card border-adaptive text-center flex flex-col items-center justify-between transition ${
                    b.unlocked
                      ? isKids
                        ? 'bg-brand-yellow text-on-brand-yellow shadow-low hover:shadow-mid'
                        : 'bg-surface-card text-text-primary shadow-low hover:shadow-mid'
                      : 'bg-surface-app opacity-60'
                  }`}
                >
                  <div className="w-12 h-12 rounded-avatar bg-surface-app border-adaptive flex items-center justify-center text-2xl mb-2">
                    {b.unlocked ? '🏆' : '🔒'}
                  </div>
                  <div className="font-bold text-caption-adaptive leading-tight">
                    {b.name}
                  </div>
                  <div className="text-micro text-text-secondary line-clamp-2 mt-1">
                    {b.description}
                  </div>
                  <div className="mt-2 text-micro font-bold px-2 py-0.5 rounded-pill bg-surface-card border-adaptive">
                    {b.unlocked ? 'UNLOCKED' : `${b.progress[0]}/${b.progress[1]}`}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
