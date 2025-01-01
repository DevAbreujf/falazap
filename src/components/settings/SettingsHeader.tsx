import React from 'react';

export function SettingsHeader() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent blur-xl" />
      <h1 className="relative text-4xl font-bold mb-8 text-gradient-primary py-2">
        Configurações da Conta
      </h1>
      <p className="text-muted-foreground mb-6">
        Gerencie suas preferências e configurações de conta
      </p>
    </div>
  );
}