import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, TrendingUp, Clock, DollarSign, Zap, CheckCircle2 } from 'lucide-react';
import AnimatedSection from '../common/AnimatedSection';
import { trackLeadMagnetDownload } from '../../utils/analytics';

const AIROICalculator: React.FC = () => {
  const [step, setStep] = useState<'input' | 'results' | 'leadCapture'>('input');
  const [inputs, setInputs] = useState({
    employees: 10,
    avgHourlyRate: 50,
    hoursPerWeek: 5,
    processType: 'data_entry'
  });
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', company: '' });

  const processTypes = {
    data_entry: { name: 'Data Entry & Processing', reduction: 80 },
    customer_support: { name: 'Customer Support', reduction: 60 },
    reporting: { name: 'Reports & Analytics', reduction: 70 },
    scheduling: { name: 'Scheduling & Coordination', reduction: 75 },
    email_mgmt: { name: 'Email Management', reduction: 65 },
  };

  const calculateROI = () => {
    const { employees, avgHourlyRate, hoursPerWeek, processType } = inputs;
    const reduction = processTypes[processType as keyof typeof processTypes].reduction;

    const weeklyHours = employees * hoursPerWeek;
    const weeklyCost = weeklyHours * avgHourlyRate;
    const monthlyCost = weeklyCost * 4;
    const yearlyCost = monthlyCost * 12;

    const hoursSaved = (weeklyHours * reduction) / 100;
    const weeklySavings = hoursSaved * avgHourlyRate;
    const monthlySavings = weeklySavings * 4;
    const yearlySavings = monthlySavings * 12;

    const automationCost = 5000;
    const paybackMonths = automationCost / monthlySavings;
    const firstYearROI = ((yearlySavings - automationCost) / automationCost) * 100;

    return {
      weeklyHours,
      hoursSaved,
      weeklySavings,
      monthlySavings,
      yearlySavings,
      paybackMonths,
      firstYearROI,
      reduction
    };
  };

  const results = calculateROI();

  const handleCalculate = () => {
    setStep('results');
  };

  const handleGetReport = async () => {
    try {
      const formData = new FormData();
      formData.append('name', contactInfo.name);
      formData.append('email', contactInfo.email);
      formData.append('company', contactInfo.company);
      formData.append('employees', inputs.employees.toString());
      formData.append('hoursPerWeek', inputs.hoursPerWeek.toString());
      formData.append('monthlySavings', Math.round(results.monthlySavings).toString());
      formData.append('yearlySavings', Math.round(results.yearlySavings).toString());
      formData.append('_subject', 'AI ROI Calculator - Request Custom Report');

      await fetch(import.meta.env.VITE_CONTACT_FORM_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });

      trackLeadMagnetDownload('AI ROI Calculator Report');

      setStep('leadCapture');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 bg-primary/10 backdrop-blur-xl border border-primary/20 rounded-full text-sm font-medium text-primary mb-6"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Interactive Calculator
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Calculate Your
            <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mt-2">
              AI Automation ROI
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover how much time and money you could save by automating repetitive tasks
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            {step === 'input' && (
              <motion.div
                key="input"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-card/70 backdrop-blur-xl border border-border rounded-2xl p-8"
              >
                <h3 className="text-2xl font-bold text-foreground mb-6">Your Current Process</h3>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Number of Employees
                    </label>
                    <input
                      type="number"
                      value={inputs.employees}
                      onChange={(e) => setInputs({ ...inputs, employees: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Average Hourly Rate ($)
                    </label>
                    <input
                      type="number"
                      value={inputs.avgHourlyRate}
                      onChange={(e) => setInputs({ ...inputs, avgHourlyRate: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      min="1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Hours Spent Per Week (per employee)
                    </label>
                    <input
                      type="number"
                      value={inputs.hoursPerWeek}
                      onChange={(e) => setInputs({ ...inputs, hoursPerWeek: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      min="1"
                      max="40"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Process Type
                    </label>
                    <select
                      value={inputs.processType}
                      onChange={(e) => setInputs({ ...inputs, processType: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      {Object.entries(processTypes).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value.name} ({value.reduction}% reduction)
                        </option>
                      ))}
                    </select>
                  </div>

                  <motion.button
                    onClick={handleCalculate}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-6 py-4 rounded-xl font-semibold hover:shadow-glow transition-all duration-150 flex items-center justify-center gap-2"
                  >
                    <TrendingUp size={20} />
                    Calculate ROI
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 'results' && (
              <motion.div
                key="results"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-card/70 backdrop-blur-xl border border-border rounded-2xl p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-foreground">Your Potential</h3>
                  <button
                    onClick={() => setStep('input')}
                    className="text-sm text-primary hover:underline"
                  >
                    Recalculate
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Your Name</label>
                    <input
                      type="text"
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Company (Optional)</label>
                    <input
                      type="text"
                      value={contactInfo.company}
                      onChange={(e) => setContactInfo({ ...contactInfo, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Your Company"
                    />
                  </div>

                  <motion.button
                    onClick={handleGetReport}
                    disabled={!contactInfo.name || !contactInfo.email}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-6 py-4 rounded-xl font-semibold hover:shadow-glow transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <TrendingUp size={20} />
                    Get Custom Report
                  </motion.button>

                  <p className="text-xs text-center text-muted-foreground">
                    We'll send you a detailed report with implementation recommendations
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {step === 'leadCapture' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card/70 backdrop-blur-xl border border-border rounded-2xl p-8 text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={32} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Report Sent!
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Check your email for your custom AI automation report and ROI breakdown.
                </p>
                <a
                  href="/contact"
                  className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Book a Free Consultation
                </a>
              </motion.div>
            ) : (
              <>
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <DollarSign className="w-8 h-8 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Monthly Savings</div>
                      <div className="text-3xl font-bold text-foreground">
                        ${Math.round(results.monthlySavings).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Based on {results.reduction}% reduction in manual work
                  </div>
                </div>

                <div className="bg-card/70 backdrop-blur-xl border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-8 h-8 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Yearly Savings</div>
                      <div className="text-3xl font-bold text-foreground">
                        ${Math.round(results.yearlySavings).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    First year ROI: {Math.round(results.firstYearROI)}%
                  </div>
                </div>

                <div className="bg-card/70 backdrop-blur-xl border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-8 h-8 text-primary" />
                    <div>
                      <div className="text-sm text-muted-foreground">Hours Saved Weekly</div>
                      <div className="text-3xl font-bold text-foreground">
                        {Math.round(results.hoursSaved)}h
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Payback period: {results.paybackMonths.toFixed(1)} months
                  </div>
                </div>

                <div className="bg-card/70 backdrop-blur-xl border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                    <h4 className="font-semibold text-foreground">What You Get</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>Custom automation strategy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>Implementation roadmap</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>Technology recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>Cost breakdown & timeline</span>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIROICalculator;
