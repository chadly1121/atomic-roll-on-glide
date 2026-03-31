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
  },
  {
    icon: Handshake,
    title: 'Integrity',
    desc: 'Honest pricing, transparent communication, and no hidden fees. We quote fair and deliver as promised.',
    accent: 'from-atomic-orange to-atomic-orange/60',
    iconBg: 'bg-atomic-orange/10',
    iconColor: 'text-atomic-orange',
  },
  {
    icon: Clock,
    title: 'Reliability',
    desc: 'We show up on time, complete projects on schedule, and clean up when we're done. Your time matters.',
    accent: 'from-atomic-navy to-atomic-navy/60',
    iconBg: 'bg-atomic-navy/10',
    iconColor: 'text-atomic-navy',
  },
  {
    icon: Heart,
    title: 'Community',
    desc: 'We're not a franchise — we're your neighbours in Muskoka. We live here, work here, and take pride in improving our community.',
    accent: 'from-pink-500 to-pink-500/60',
    iconBg: 'bg-pink-500/10',
    iconColor: 'text-pink-500',
  },
];

const OurValuesSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-muted/40" aria-labelledby="values-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 sm:mb-14">
          <motion.h2
            id="values-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-atomic-navy mb-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What We Stand For
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Four principles that guide every project we touch.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {values.map((v, idx) => (
            <motion.div
              key={v.title}
              className="group relative bg-background rounded-2xl border border-border p-6 sm:p-7 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
            >
              {/* Top accent bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${v.accent} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
              />

              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${v.iconBg} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                <v.icon className={`w-6 h-6 ${v.iconColor}`} aria-hidden="true" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-atomic-navy mb-2 group-hover:text-atomic-turquoise transition-colors duration-300">
                {v.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurValuesSection;
