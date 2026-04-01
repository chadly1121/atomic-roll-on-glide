import React from 'react';
import { motion } from 'framer-motion';
import { Diamond, Handshake, Clock, Heart } from 'lucide-react';

const values = [
  {
    icon: Diamond,
    title: 'Quality',
    desc: 'We never compromise on materials or techniques. Every surface is prepared with care and every coat applied with precision.',
    accent: 'from-atomic-turquoise to-atomic-turquoise/60',
    iconBg: 'bg-atomic-turquoise/10',
    iconColor: 'text-atomic-turquoise',
    stat: '25+ Years',
    statLabel: 'of excellence',
  },
  {
    icon: Handshake,
    title: 'Integrity',
    desc: 'Honest pricing, transparent communication, and no hidden fees. We quote fair and deliver as promised.',
    accent: 'from-atomic-orange to-atomic-orange/60',
    iconBg: 'bg-atomic-orange/10',
    iconColor: 'text-atomic-orange',
    stat: '$0 Surprises',
    statLabel: 'transparent quotes',
  },
  {
    icon: Clock,
    title: 'Reliability',
    desc: "We show up on time, complete projects on schedule, and clean up when we're done. Your time matters.",
    accent: 'from-atomic-navy to-atomic-navy/60',
    iconBg: 'bg-atomic-navy/10',
    iconColor: 'text-atomic-turquoise',
    stat: 'On Time',
    statLabel: 'every project',
  },
  {
    icon: Heart,
    title: 'Community',
    desc: "We're not a franchise — we're your neighbours in Muskoka. We live here, work here, and take pride in improving our community.",
    accent: 'from-pink-500 to-pink-500/60',
    iconBg: 'bg-pink-500/10',
    iconColor: 'text-pink-500',
    stat: 'Local',
    statLabel: 'Muskoka proud',
  },
];

const OurValuesSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-muted/30" aria-labelledby="values-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <motion.span
            className="inline-block text-sm font-semibold tracking-widest uppercase text-atomic-turquoise mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Our Promise
          </motion.span>
          <motion.h2
            id="values-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-atomic-navy mb-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What We Stand For
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Four principles that guide every project we touch — backed by over two decades of proven results.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-6xl mx-auto">
          {values.map((v, idx) => (
            <motion.div
              key={v.title}
              className="group relative bg-background rounded-2xl border border-border/60 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
            >
              {/* Top accent gradient bar */}
              <div
                className={`h-1.5 bg-gradient-to-r ${v.accent} w-full`}
              />

              <div className="p-6 sm:p-7 flex flex-col flex-1">
                {/* Icon + Stat row */}
                <div className="flex items-start justify-between mb-5">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${v.iconBg} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <v.icon className={`w-7 h-7 ${v.iconColor}`} aria-hidden="true" />
                  </div>
                  <div className="text-right">
                    <span className={`block text-lg font-bold ${v.iconColor}`}>{v.stat}</span>
                    <span className="block text-xs text-muted-foreground">{v.statLabel}</span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-atomic-navy mb-2.5 group-hover:text-atomic-turquoise transition-colors duration-300">
                  {v.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {v.desc}
                </p>

                {/* Bottom trust indicator */}
                <div className="mt-5 pt-4 border-t border-border/40">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${v.accent} animate-pulse`} />
                    <span className="text-xs font-medium text-muted-foreground">Core commitment</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust strip */}
        <motion.div
          className="mt-12 sm:mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {['$5M Liability Insured', 'WSIB Covered', 'PCA Member', '5× on HGTV', '15× in Dockside Magazine'].map((badge) => (
            <span key={badge} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-atomic-turquoise" />
              <span className="font-medium">{badge}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurValuesSection;
