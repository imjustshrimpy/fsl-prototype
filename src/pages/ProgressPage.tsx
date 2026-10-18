import React, { useState } from 'react';
import { useAgeMode } from '../context/AgeModeContext';
import { useTranslation } from '../i18n';
import { MOCK_BADGES, MOCK_EDUCATOR_ROSTER, MOCK_FAMILY_SUMMARY, StudentRosterItem } from '../data/mock-data';
import { BadgeItem } from '../types';
import { Button } from '../components/primitives/Button';
import { IconButton } from '../components/primitives/IconButton';
import { Card } from '../components/primitives/Card';
import { VisualAlert } from '../components/primitives/VisualAlert';
import {
  Award,
  Star,
  Download,
  Table as TableIcon,
  BarChart,
  Copy,
  Check,
  Bell,
  BookOpenText,
  Users,
  Video,
  FileText,
  CalendarClock,
  CircleDashed,
  UserRound,
  MessageSquare,
  BadgeCheck,
} from 'lucide-react';

type InstructorTab = 'stream' | 'classwork' | 'people' | 'grades';

type GradeReviewState = {
  studentName: string;
  assignmentKey: string;
  assignmentLabel: string;
  currentScore: string;
} | null;

export const ProgressPage: React.FC = () => {
  const { role, isKids } = useAgeMode();
  const { t } = useTranslation();

  const [showDataTable, setShowDataTable] = useState<boolean>(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);
  const [instructorTab, setInstructorTab] = useState<InstructorTab>('stream');
  const [copiedInvite, setCopiedInvite] = useState(false);
  const [portfolioStudent, setPortfolioStudent] = useState<StudentRosterItem | null>(null);
  const [reviewState, setReviewState] = useState<GradeReviewState>(null);
  const [reviewScore, setReviewScore] = useState('92');
  const [reviewNotes, setReviewNotes] = useState('');
  const [selectedFeedbackTags, setSelectedFeedbackTags] = useState<string[]>([]);

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

  const instructorTabs = [
    { id: 'stream', label: t('instructor.tabs.stream') },
    { id: 'classwork', label: t('instructor.tabs.classwork') },
    { id: 'people', label: t('instructor.tabs.people') },
    { id: 'grades', label: t('instructor.tabs.grades') },
  ] as const;

  const assignmentColumns = {
    gateHello: t('instructor.grades.columns.gateHello'),
    askRepeat: t('instructor.grades.columns.askRepeat'),
    medicalEmergency: t('instructor.grades.columns.medicalEmergency'),
  };

  const gradeReviewTags = [
    t('instructor.review.tags.goodHandPosition'),
    t('instructor.review.tags.checkPalmFacing'),
    t('instructor.review.tags.smoothMotion'),
  ];

  const initialGradebook = [
    {
      studentName: 'Maria Santos',
      gateHello: '95/100',
      askRepeat: '88/100',
      medicalEmergency: 'Turned In',
    },
    {
      studentName: 'Paolo Reyes',
      gateHello: '90/100',
      askRepeat: '92/100',
      medicalEmergency: '95/100',
    },
    {
      studentName: 'Ana Lim',
      gateHello: 'Turned In',
      askRepeat: 'Missing',
      medicalEmergency: '78/100',
    },
    {
      studentName: 'Jomar Dela Cruz',
      gateHello: '83/100',
      askRepeat: '84/100',
      medicalEmergency: 'Turned In',
    },
    {
      studentName: 'Bea Villanueva',
      gateHello: '97/100',
      askRepeat: '96/100',
      medicalEmergency: '93/100',
    },
    {
      studentName: 'Carlo Ramos',
      gateHello: 'Missing',
      askRepeat: 'Turned In',
      medicalEmergency: '70/100',
    },
  ];

  const [gradebookRows, setGradebookRows] = useState(initialGradebook);

  const handleExportCsv = () => {
    setExportNotice(t('instructor.exportNotice'));
  };

  const handleCopyInvite = async () => {
    try {
      await navigator.clipboard.writeText('pik-fsl-2026');
      setCopiedInvite(true);
      window.setTimeout(() => setCopiedInvite(false), 1200);
    } catch (error) {
      setCopiedInvite(false);
    }
  };

  const openSubmissionReviewer = (studentName: string, assignmentKey: string) => {
    const assignmentLabel = assignmentColumns[assignmentKey as keyof typeof assignmentColumns];
    const row = gradebookRows.find((entry) => entry.studentName === studentName);
    const scoreValue = row?.[assignmentKey as keyof typeof row] as string | undefined;
    const currentScore = scoreValue ? scoreValue : t('instructor.grades.status.missing');
    setReviewState({
      studentName,
      assignmentKey,
      assignmentLabel,
      currentScore,
    });
    setReviewScore(currentScore.includes('/') ? currentScore.split('/')[0] : '0');
    setReviewNotes('');
    setSelectedFeedbackTags([]);
  };

  const handleSaveReview = () => {
    if (!reviewState) return;
    const numericScore = Math.min(100, Math.max(0, Number(reviewScore || 0)));
    setGradebookRows((prevRows) =>
      prevRows.map((row) =>
        row.studentName === reviewState.studentName
          ? { ...row, [reviewState.assignmentKey]: `${numericScore}/100` }
          : row,
      ),
    );
    setReviewState(null);
    setReviewScore('92');
    setReviewNotes('');
    setSelectedFeedbackTags([]);
  };

  const getStatusClass = (status: string) => {
    if (status === 'handed-in') return 'bg-brand-green/10 text-brand-green';
    if (status === 'graded') return 'bg-brand-blue/10 text-brand-blue';
    return 'bg-surface-app text-text-secondary';
  };

  const statusLabels = {
    'handed-in': t('instructor.status.handedIn'),
    assigned: t('instructor.status.assigned'),
    graded: t('instructor.status.graded'),
  };

  const upcomingDeadlines = [
    { title: t('instructor.stream.deadlineOne'), due: 'Wed 5:00 PM' },
    { title: t('instructor.stream.deadlineTwo'), due: 'Fri 9:00 AM' },
    { title: t('instructor.stream.deadlineThree'), due: 'Mon 4:30 PM' },
  ];

  const classworkGroups = [
    {
      title: t('instructor.classwork.unitOne.title'),
      tasks: [
        { name: t('instructor.classwork.unitOne.taskOne'), status: 'graded' },
        { name: t('instructor.classwork.unitOne.taskTwo'), status: 'handed-in' },
        { name: t('instructor.classwork.unitOne.taskThree'), status: 'assigned' },
      ],
    },
    {
      title: t('instructor.classwork.unitTwo.title'),
      tasks: [
        { name: t('instructor.classwork.unitTwo.taskOne'), status: 'handed-in' },
        { name: t('instructor.classwork.unitTwo.taskTwo'), status: 'graded' },
      ],
    },
  ];

  return (
    <div className="space-y-6 pb-24 max-w-3xl mx-auto">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-title-adaptive font-black text-text-primary tracking-tight">
            {role === 'educator' ? t('progress.educatorTab') : role === 'family' ? t('progress.familyTab') : t('progress.learnerTab')}
          </h2>
          <p className="text-body-adaptive text-text-secondary">
            {t('instructor.headerCaption')} <span className="font-bold text-brand-blue uppercase tracking-tighter">{role}</span>
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
          title={t('instructor.exportTitle')}
          message={exportNotice}
          onClose={() => setExportNotice(null)}
        />
      )}

      {role === 'educator' && (
        <div className="space-y-5">
          <section className="overflow-hidden rounded-card border-adaptive bg-surface-card shadow-low">
            <div className="bg-brand-blue px-4 py-5 text-on-brand-blue">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-caption-adaptive uppercase tracking-[0.12em] text-on-brand-blue/80">
                    {t('instructor.subjectLabel')}
                  </p>
                  <h3 className="mt-1 text-title-adaptive font-black text-on-brand-blue">
                    {t('instructor.classTitle')}
                  </h3>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  className="border border-white/30 bg-white/10 text-on-brand-blue"
                  onClick={handleCopyInvite}
                >
                  {copiedInvite ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
                  <span>{copiedInvite ? t('instructor.copiedInvite') : t('instructor.copyInvite')}</span>
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-caption-adaptive text-on-brand-blue/90">
                <span className="rounded-pill border border-white/25 bg-white/10 px-2 py-1">
                  {t('instructor.subjectCode', { code: 'fsl-101-secA' })}
                </span>
                <span className="rounded-pill border border-white/25 bg-white/10 px-2 py-1">
                  {t('instructor.inviteCode', { code: 'pik-fsl-2026' })}
                </span>
              </div>
            </div>

            <div className="border-t border-adaptive px-3 py-2">
              <nav className="flex gap-2 overflow-x-auto" aria-label={t('instructor.navLabel')}>
                {instructorTabs.map((tab) => {
                  const isActive = tab.id === instructorTab;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setInstructorTab(tab.id)}
                      className={`rounded-control px-3 py-2 text-caption-adaptive font-bold transition ${
                        isActive ? 'bg-brand-blue text-on-brand-blue shadow-low' : 'bg-surface-app text-text-secondary'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
          </section>

          {instructorTab === 'stream' && (
            <div className="grid gap-5 lg:grid-cols-[1.65fr_0.9fr]">
              <div className="space-y-4">
                <Card className="space-y-3">
                  <div className="flex items-center gap-2 text-body-adaptive font-bold text-text-primary">
                    <Bell className="w-4 h-4 text-brand-blue" aria-hidden="true" />
                    <span>{t('instructor.stream.announcementTitle')}</span>
                  </div>
                  <textarea
                    className="w-full min-h-[110px] rounded-control border-adaptive bg-surface-app p-3 text-body-adaptive text-text-primary placeholder:text-text-secondary focus-ring-adaptive"
                    placeholder={t('instructor.stream.announcementPlaceholder')}
                  />
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-caption-adaptive text-text-secondary">{t('instructor.stream.promptHint')}</span>
                    <Button type="button" variant="primary" className="text-caption-adaptive">
                      {t('instructor.stream.postButton')}
                    </Button>
                  </div>
                </Card>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-body-adaptive font-bold text-text-primary">
                    <MessageSquare className="w-4 h-4 text-brand-orange" aria-hidden="true" />
                    <span>{t('instructor.stream.feedTitle')}</span>
                  </div>
                  {[t('instructor.stream.feedItemOne'), t('instructor.stream.feedItemTwo')].map((item) => (
                    <Card key={item} className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-avatar bg-brand-blue/10 p-2 text-brand-blue">
                        <FileText className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-body-adaptive font-medium text-text-primary">{item}</p>
                        <p className="mt-1 text-caption-adaptive text-text-secondary">{t('instructor.stream.feedTime')}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <aside className="space-y-4">
                <Card className="bg-surface-app">
                  <div className="flex items-center gap-2 text-body-adaptive font-bold text-text-primary">
                    <CalendarClock className="w-4 h-4 text-brand-green" aria-hidden="true" />
                    <span>{t('instructor.stream.deadlineTitle')}</span>
                  </div>
                  <div className="mt-3 space-y-3">
                    {upcomingDeadlines.map((deadline) => (
                      <div key={deadline.title} className="rounded-control border-adaptive bg-surface-card p-3">
                        <p className="text-body-adaptive font-medium text-text-primary">{deadline.title}</p>
                        <p className="mt-1 text-caption-adaptive text-text-secondary">{deadline.due}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </aside>
            </div>
          )}

          {instructorTab === 'classwork' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-body-adaptive font-bold text-text-primary">
                  <BookOpenText className="w-5 h-5 text-brand-blue" aria-hidden="true" />
                  <span>{t('instructor.classwork.title')}</span>
                </div>
                <Button type="button" variant="primary" className="text-caption-adaptive">
                  {t('instructor.classwork.createButton')}
                </Button>
              </div>

              {classworkGroups.map((group) => (
                <Card key={group.title} className="space-y-3">
                  <h4 className="text-body-adaptive font-black text-text-primary">{group.title}</h4>
                  <div className="space-y-2">
                    {group.tasks.map((task) => (
                      <div key={task.name} className="rounded-control border-adaptive bg-surface-app p-3">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-medium text-text-primary">{task.name}</p>
                            <p className="mt-1 text-caption-adaptive text-text-secondary">{t('instructor.classwork.taskDescription')}</p>
                          </div>
                          <span className={`rounded-pill px-2 py-1 text-caption-adaptive font-bold ${getStatusClass(task.status)}`}>
                            {statusLabels[task.status as keyof typeof statusLabels]}
                          </span>
                        </div>
                        <div className="mt-3 grid gap-2 rounded-control border-adaptive bg-surface-card p-3 text-caption-adaptive text-text-secondary md:grid-cols-3">
                          <div>
                            <p className="font-bold text-text-primary">{t('instructor.classwork.rubric.handShape')}</p>
                            <p>40%</p>
                          </div>
                          <div>
                            <p className="font-bold text-text-primary">{t('instructor.classwork.rubric.palmOrientation')}</p>
                            <p>30%</p>
                          </div>
                          <div>
                            <p className="font-bold text-text-primary">{t('instructor.classwork.rubric.motionTiming')}</p>
                            <p>30%</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {instructorTab === 'people' && (
            <div className="space-y-4">
              <Card className="overflow-x-auto">
                <div className="mb-3 flex items-center gap-2 text-body-adaptive font-bold text-text-primary">
                  <Users className="w-5 h-5 text-brand-blue" aria-hidden="true" />
                  <span>{t('instructor.people.title')}</span>
                </div>

                <table className="w-full min-w-[620px] border-collapse text-left text-caption-adaptive">
                  <thead>
                    <tr className="border-b border-adaptive text-text-secondary">
                      <th scope="col" className="pb-2 font-bold">{t('instructor.people.headers.student')}</th>
                      <th scope="col" className="pb-2 font-bold">{t('instructor.people.headers.level')}</th>
                      <th scope="col" className="pb-2 font-bold">{t('instructor.people.headers.accuracy')}</th>
                      <th scope="col" className="pb-2 font-bold">{t('instructor.people.headers.speed')}</th>
                      <th scope="col" className="pb-2 font-bold">{t('instructor.people.headers.modules')}</th>
                      <th scope="col" className="pb-2 font-bold">{t('instructor.people.headers.status')}</th>
                      <th scope="col" className="pb-2 font-bold">{t('instructor.people.headers.action')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-adaptive">
                    {MOCK_EDUCATOR_ROSTER.map((student) => (
                      <tr key={student.id} className="align-middle">
                        <td className="py-3 font-medium text-text-primary">{student.name}</td>
                        <td className="py-3 text-text-primary">Lvl {student.level}</td>
                        <td className="py-3 font-bold text-brand-blue">{student.accuracy}%</td>
                        <td className="py-3 tabular-nums text-text-primary">{student.avgTimeSeconds}s</td>
                        <td className="py-3 text-text-primary">{student.scenariosDone}</td>
                        <td className="py-3">
                          <span className={`rounded-pill px-2 py-1 text-caption-adaptive font-bold ${student.accuracy >= 80 ? 'bg-brand-green/10 text-brand-green' : 'bg-brand-orange/10 text-brand-orange'}`}>
                            {student.accuracy >= 80 ? t('instructor.status.active') : t('instructor.status.needsHelp')}
                          </span>
                        </td>
                        <td className="py-3">
                          <Button type="button" variant="secondary" onClick={() => setPortfolioStudent(student)} className="text-caption-adaptive">
                            {t('instructor.people.inspectPortfolio')}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          )}

          {instructorTab === 'grades' && (
            <div className="space-y-4">
              <Card className="overflow-x-auto">
                <div className="mb-3 flex items-center gap-2 text-body-adaptive font-bold text-text-primary">
                  <BadgeCheck className="w-5 h-5 text-brand-green" aria-hidden="true" />
                  <span>{t('instructor.grades.title')}</span>
                </div>

                <table className="w-full min-w-[620px] border-collapse text-left text-caption-adaptive">
                  <thead>
                    <tr className="border-b border-adaptive text-text-secondary">
                      <th scope="col" className="pb-2 font-bold">{t('instructor.grades.headers.student')}</th>
                      <th scope="col" className="pb-2 font-bold">{assignmentColumns.gateHello}</th>
                      <th scope="col" className="pb-2 font-bold">{assignmentColumns.askRepeat}</th>
                      <th scope="col" className="pb-2 font-bold">{assignmentColumns.medicalEmergency}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-adaptive">
                    {gradebookRows.map((row) => (
                      <tr key={row.studentName} className="align-middle">
                        <td className="py-3 font-medium text-text-primary">{row.studentName}</td>
                        <td
                          className="cursor-pointer py-3 font-bold text-brand-blue"
                          onClick={() => openSubmissionReviewer(row.studentName, 'gateHello')}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              openSubmissionReviewer(row.studentName, 'gateHello');
                            }
                          }}
                        >
                          {row.gateHello}
                        </td>
                        <td
                          className="cursor-pointer py-3 font-bold text-brand-blue"
                          onClick={() => openSubmissionReviewer(row.studentName, 'askRepeat')}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              openSubmissionReviewer(row.studentName, 'askRepeat');
                            }
                          }}
                        >
                          {row.askRepeat}
                        </td>
                        <td
                          className="cursor-pointer py-3 font-bold text-brand-blue"
                          onClick={() => openSubmissionReviewer(row.studentName, 'medicalEmergency')}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              openSubmissionReviewer(row.studentName, 'medicalEmergency');
                            }
                          }}
                        >
                          {row.medicalEmergency}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          )}

          {portfolioStudent && (
            <div className="fixed inset-0 z-50 flex items-end justify-center bg-surface-overlay p-4 md:items-center">
              <div className="w-full max-w-md rounded-card border-adaptive bg-surface-card p-5 shadow-high">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-caption-adaptive uppercase tracking-[0.12em] text-text-secondary">
                      {t('instructor.people.portfolioBadge')}
                    </p>
                    <h4 className="mt-1 text-subtitle-adaptive font-black text-text-primary">{portfolioStudent.name}</h4>
                  </div>
                  <button type="button" onClick={() => setPortfolioStudent(null)} className="rounded-control border-adaptive bg-surface-app px-2 py-1 text-caption-adaptive font-bold text-text-primary">
                    {t('common.close')}
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-control border-adaptive bg-surface-app p-3">
                    <div className="text-caption-adaptive text-text-secondary">{t('instructor.people.accuracy')}</div>
                    <div className="mt-1 text-body-adaptive font-black text-brand-blue">{portfolioStudent.accuracy}%</div>
                  </div>
                  <div className="rounded-control border-adaptive bg-surface-app p-3">
                    <div className="text-caption-adaptive text-text-secondary">{t('instructor.people.speed')}</div>
                    <div className="mt-1 text-body-adaptive font-black text-brand-blue">{portfolioStudent.avgTimeSeconds}s</div>
                  </div>
                  <div className="rounded-control border-adaptive bg-surface-app p-3">
                    <div className="text-caption-adaptive text-text-secondary">{t('instructor.people.modules')}</div>
                    <div className="mt-1 text-body-adaptive font-black text-text-primary">{portfolioStudent.scenariosDone}</div>
                  </div>
                  <div className="rounded-control border-adaptive bg-surface-app p-3">
                    <div className="text-caption-adaptive text-text-secondary">{t('instructor.people.focus')}</div>
                    <div className="mt-1 text-body-adaptive font-black text-text-primary">{portfolioStudent.weakSign}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {reviewState && (
            <div className="fixed inset-0 z-50 flex items-end justify-center bg-surface-overlay p-4 md:items-center">
              <div className="w-full max-w-xl rounded-card border-adaptive bg-surface-card p-5 shadow-high">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-caption-adaptive uppercase tracking-[0.12em] text-text-secondary">
                      {t('instructor.review.title')}
                    </p>
                    <h4 className="mt-1 text-subtitle-adaptive font-black text-text-primary">
                      {reviewState.studentName} · {reviewState.assignmentLabel}
                    </h4>
                  </div>
                  <button type="button" onClick={() => setReviewState(null)} className="rounded-control border-adaptive bg-surface-app px-2 py-1 text-caption-adaptive font-bold text-text-primary">
                    {t('common.close')}
                  </button>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
                  <div className="rounded-card border-adaptive bg-surface-app p-3">
                    <div className="flex items-center gap-2 text-body-adaptive font-bold text-text-primary">
                      <Video className="w-4 h-4 text-brand-blue" aria-hidden="true" />
                      <span>{t('instructor.review.video')}</span>
                    </div>
                    <div className="mt-3 flex aspect-video items-center justify-center rounded-control border-adaptive bg-surface-card text-caption-adaptive text-text-secondary">
                      {t('instructor.review.playerPlaceholder')}
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-caption-adaptive text-text-secondary">
                      <div className="rounded-control border-adaptive bg-surface-card p-2">
                        <div>{t('instructor.review.metrics.precision')}</div>
                        <div className="mt-1 font-bold text-brand-blue">92%</div>
                      </div>
                      <div className="rounded-control border-adaptive bg-surface-card p-2">
                        <div>{t('instructor.review.metrics.stability')}</div>
                        <div className="mt-1 font-bold text-brand-blue">88%</div>
                      </div>
                      <div className="rounded-control border-adaptive bg-surface-card p-2">
                        <div>{t('instructor.review.metrics.confidence')}</div>
                        <div className="mt-1 font-bold text-brand-blue">94%</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="block text-caption-adaptive font-bold text-text-primary" htmlFor="review-score">
                        {t('instructor.review.scoreLabel')}
                      </label>
                      <input
                        id="review-score"
                        type="number"
                        min={0}
                        max={100}
                        value={reviewScore}
                        onChange={(event) => setReviewScore(event.target.value)}
                        className="w-full rounded-control border-adaptive bg-surface-app p-3 text-body-adaptive text-text-primary focus-ring-adaptive"
                      />
                    </div>

                    <div>
                      <p className="text-caption-adaptive font-bold text-text-primary">{t('instructor.review.tagsTitle')}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {gradeReviewTags.map((tag) => {
                          const active = selectedFeedbackTags.includes(tag);
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => {
                                setSelectedFeedbackTags((prev) =>
                                  active ? prev.filter((item) => item !== tag) : [...prev, tag],
                                );
                              }}
                              className={`rounded-pill px-2 py-1 text-caption-adaptive font-bold transition ${
                                active ? 'bg-brand-blue text-on-brand-blue' : 'bg-surface-app text-text-secondary border-adaptive'
                              }`}
                            >
                              {tag}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-caption-adaptive font-bold text-text-primary" htmlFor="review-notes">
                        {t('instructor.review.commentLabel')}
                      </label>
                      <textarea
                        id="review-notes"
                        value={reviewNotes}
                        onChange={(event) => setReviewNotes(event.target.value)}
                        rows={4}
                        className="w-full rounded-control border-adaptive bg-surface-app p-3 text-body-adaptive text-text-primary focus-ring-adaptive"
                        placeholder={t('instructor.review.commentPlaceholder')}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button type="button" onClick={handleSaveReview} className="text-caption-adaptive">
                        {t('instructor.review.submitButton')}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {role === 'learner' && (
        <div className="space-y-6">
          <Card className="space-y-4">
            {isKids ? (
              <div className="space-y-2">
                <h3 className="text-subtitle-adaptive font-bold text-text-primary">{t('progress.kidsSummaryTitle')}</h3>
                <p className="text-body-adaptive text-text-secondary">
                  {t('progress.kidsSummary', {
                    start: accuracyData[0].acc,
                    end: accuracyData[accuracyData.length - 1].acc,
                    days: accuracyData.length,
                    gain: accuracyData[accuracyData.length - 1].acc - accuracyData[0].acc,
                  })}
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-subtitle-adaptive font-bold text-text-primary">10-Day Accuracy Trajectory</h3>
                    <p className="text-caption-adaptive text-text-secondary">Visual graph with high contrast tokens & pattern indicators</p>
                  </div>

                  <IconButton
                    variant="ghost"
                    onClick={() => setShowDataTable(!showDataTable)}
                    aria-label={t(showDataTable ? 'progress.showChartView' : 'progress.showTableView')}
                    title={t(showDataTable ? 'progress.showChartView' : 'progress.showTableView')}
                    className="shrink-0"
                  >
                    {showDataTable ? <BarChart className="w-4 h-4" /> : <TableIcon className="w-4 h-4" />}
                  </IconButton>
                </div>

                <div className="p-3 bg-surface-app rounded-control border-adaptive text-caption-adaptive" aria-label="Chart text summary">
                  <span className="font-bold">Text Summary: </span>
                  <span>{t('progress.chartSummaryAccuracy')}</span>
                </div>

                {!showDataTable ? (
                  <div className="space-y-4 pt-2" aria-hidden="true">
                    <div className="flex items-end justify-between gap-1.5 h-40 p-4 bg-surface-app rounded-control border-adaptive">
                      {accuracyData.map((d) => (
                        <div key={d.day} className="flex-1 flex flex-col items-center h-full justify-end group">
                          <div className="w-full bg-brand-blue rounded-control transition-all duration-base group-hover:bg-brand-orange" style={{ height: `${d.acc}%` }} title={`${d.day}: ${d.acc}%`} />
                          <span className="text-micro font-bold text-text-primary mt-1.5 tracking-tighter truncate w-full text-center">{d.acc}%</span>
                          <span className="text-micro text-text-secondary mt-0.5 tracking-tighter truncate w-full text-center">{d.day.replace('Day ', 'D')}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-caption-adaptive text-text-secondary">
                      <span>Day 1</span>
                      <span>Day 10</span>
                    </div>
                  </div>
                ) : (
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
              </>
            )}
          </Card>

          <section aria-labelledby="badges-heading" className="space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-brand-orange" aria-hidden="true" />
              <h3 id="badges-heading" className="text-subtitle-adaptive font-bold text-text-primary">
                {t('progress.badgesTitle')} (8 Badges)
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
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
                  <div className="font-bold text-caption-adaptive leading-tight">{b.name}</div>
                  <div className="text-micro text-text-secondary line-clamp-2 mt-1">{b.description}</div>
                  <div className="mt-2 text-micro font-bold px-2 py-0.5 rounded-pill bg-surface-card border-adaptive">
                    {b.unlocked ? 'UNLOCKED' : `${b.progress[0]}/${b.progress[1]}`}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {role === 'family' && (
        <div className="space-y-4">
          <Card className="bg-brand-yellow/15 border-brand-yellow pad-adaptive-control space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-avatar bg-brand-yellow text-on-brand-yellow flex items-center justify-center text-3xl">👦</div>
              <div>
                <h3 className="text-title-adaptive font-extrabold text-text-primary">{MOCK_FAMILY_SUMMARY.childName}’s Sign Journey</h3>
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
    </div>
  );
};
