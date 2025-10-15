import React, { useState, useEffect } from 'react';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    enabled: true,
    sourceField: 'title',
    fallbackField: 'name',
    handleRichText: true,
    addSuffixForUnique: true,
    supportCyrillic: true,
    updateExistingSlugs: true,
    slugifyOptions: {
      lower: true,
      strict: true,
      locale: 'ru'
    }
  });
  
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Загружаем настройки при монтировании
  useEffect(() => {
    fetchSettings();
    fetchStatus();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/auto-slug-manager/settings');
      const result = await response.json();
      setSettings(result.data);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const fetchStatus = async () => {
    try {
      const response = await fetch('/auto-slug-manager/status');
      const result = await response.json();
      setStatus(result.data);
    } catch (error) {
      console.error('Error loading status:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('/auto-slug-manager/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });
      
      const result = await response.json();
      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error saving settings');
      console.error('Error saving:', error);
    }
    setLoading(false);
  };

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return React.createElement('div', {
    style: {
      padding: '2rem',
      fontFamily: 'system-ui, sans-serif',
      maxWidth: '900px',
      margin: '0 auto',
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }
  },
    // Заголовок
    React.createElement('div', {
      style: {
        marginBottom: '2rem',
        textAlign: 'center',
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
        border: '1px solid #e2e8f0'
      }
    },
      React.createElement('h1', {
        style: {
          color: '#1e40af',
          marginBottom: '0.5rem',
          fontSize: '2.5rem',
          fontWeight: '700'
        }
      }, '🔗 Auto Slug Manager'),
      React.createElement('p', {
        style: {
          color: '#64748b',
          fontSize: '1.1rem',
          margin: 0
        }
      }, 'Universal slug generator for all content-types')
    ),

    // Сообщение об успехе
    message && React.createElement('div', {
      style: {
        backgroundColor: message.includes('Error') ? '#fef2f2' : '#f0f9ff',
        border: `2px solid ${message.includes('Error') ? '#f87171' : '#60a5fa'}`,
        borderRadius: '10px',
        padding: '1rem 1.5rem',
        marginBottom: '1.5rem',
        color: message.includes('Error') ? '#dc2626' : '#1d4ed8',
        fontWeight: '600',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
      }
    }, message),

    // Статус плагина
    status && React.createElement('div', {
      style: {
        backgroundColor: 'white',
        border: '2px solid #d1fae5',
        borderRadius: '12px',
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
      }
    },
      React.createElement('h3', {
        style: {
          color: '#059669',
          marginBottom: '1rem',
          fontSize: '1.3rem',
          fontWeight: '700'
        }
      }, '✅ Plugin Status'),
      React.createElement('div', {
        style: { 
          marginBottom: '0.5rem',
          fontSize: '1rem',
          color: '#374151',
          fontWeight: '500'
        }
      }, `Found content-types: ${status.contentTypesCount}`),
      React.createElement('div', {
        style: { 
          fontSize: '0.875rem', 
          color: '#6b7280',
          fontStyle: 'italic'
        }
      }, `Last update: ${new Date(status.lastUpdate).toLocaleString()}`)
    ),

    // Основные настройки
    React.createElement('div', {
      style: {
        backgroundColor: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
      }
    },
      React.createElement('h3', {
        style: {
          color: '#1f2937',
          marginBottom: '1.5rem',
          fontSize: '1.3rem',
          fontWeight: '700'
        }
      }, '⚙️ Settings'),

      // Переключатели
      ...[
        { key: 'enabled', label: 'Enable plugin', desc: 'Global enable/disable' },
        { key: 'updateExistingSlugs', label: 'Update existing slugs', desc: 'Regenerate when title changes' },
        { key: 'handleRichText', label: 'Rich Text support', desc: 'Extract text from Rich Text Blocks and classic Rich Text' },
        { key: 'supportCyrillic', label: 'Cyrillic support', desc: 'Transliteration of Russian characters' },
        { key: 'addSuffixForUnique', label: 'Suffixes for uniqueness', desc: 'Add -1, -2, -3 for unique slugs' }
      ].map(item => 
        React.createElement('div', {
          key: item.key,
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.25rem 0',
            borderBottom: '1px solid #f1f5f9'
          }
        },
          React.createElement('div', null,
            React.createElement('div', {
              style: { 
                fontWeight: '600', 
                marginBottom: '0.25rem',
                color: '#1f2937',
                fontSize: '0.95rem'
              }
            }, item.label),
            React.createElement('div', {
              style: { 
                fontSize: '0.8rem', 
                color: '#6b7280',
                lineHeight: '1.4'
              }
            }, item.desc)
          ),
          React.createElement('label', {
            style: {
              position: 'relative',
              display: 'inline-block',
              width: '60px',
              height: '34px',
              cursor: 'pointer'
            }
          },
            React.createElement('input', {
              type: 'checkbox',
              checked: settings[item.key],
              onChange: () => handleToggle(item.key),
              style: { display: 'none' }
            }),
            React.createElement('span', {
              style: {
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: settings[item.key] ? '#10b981' : '#ccc',
                borderRadius: '34px',
                transition: '0.4s'
              }
            }),
            React.createElement('span', {
              style: {
                position: 'absolute',
                content: '',
                height: '26px',
                width: '26px',
                left: settings[item.key] ? '30px' : '4px',
                bottom: '4px',
                backgroundColor: 'white',
                borderRadius: '50%',
                transition: '0.4s'
              }
            })
          )
        )
      )
    ),

    // Настройки полей
    React.createElement('div', {
      style: {
        backgroundColor: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
      }
    },
      React.createElement('h3', {
        style: {
          color: '#1f2937',
          marginBottom: '1.5rem',
          fontSize: '1.3rem',
          fontWeight: '700'
        }
      }, '📝 Source Fields'),
      
      // Основное поле
      React.createElement('div', {
        style: { marginBottom: '1.5rem' }
      },
        React.createElement('label', {
          style: {
            display: 'block',
            fontSize: '0.95rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }
        }, 'Main field for slug generation'),
        React.createElement('select', {
          value: settings.sourceField,
          onChange: (e) => setSettings(prev => ({ ...prev, sourceField: e.target.value })),
          style: {
            width: '100%',
            padding: '0.875rem',
            border: '2px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '0.95rem',
            backgroundColor: 'white',
            color: '#1f2937',
            fontWeight: '500'
          }
        },
          React.createElement('option', { value: 'title' }, 'title'),
          React.createElement('option', { value: 'name' }, 'name'),
          React.createElement('option', { value: 'label' }, 'label'),
          React.createElement('option', { value: 'heading' }, 'heading'),
          React.createElement('option', { value: 'caption' }, 'caption')
        ),
        React.createElement('p', {
          style: {
            fontSize: '0.8rem',
            color: '#6b7280',
            marginTop: '0.5rem',
            lineHeight: '1.4'
          }
        }, 'Field from which the slug will be generated first')
      ),
      
      // Резервное поле  
      React.createElement('div', null,
        React.createElement('label', {
          style: {
            display: 'block',
            fontSize: '0.95rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }
        }, 'Fallback field'),
        React.createElement('select', {
          value: settings.fallbackField,
          onChange: (e) => setSettings(prev => ({ ...prev, fallbackField: e.target.value })),
          style: {
            width: '100%',
            padding: '0.875rem',
            border: '2px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '0.95rem',
            backgroundColor: 'white',
            color: '#1f2937',
            fontWeight: '500'
          }
        },
          React.createElement('option', { value: 'name' }, 'name'),
          React.createElement('option', { value: 'title' }, 'title'),
          React.createElement('option', { value: 'label' }, 'label'),
          React.createElement('option', { value: 'heading' }, 'heading'),
          React.createElement('option', { value: 'caption' }, 'caption'),
          React.createElement('option', { value: '' }, 'Do not use')
        ),
        React.createElement('p', {
          style: {
            fontSize: '0.8rem',
            color: '#6b7280',
            marginTop: '0.5rem',
            lineHeight: '1.4'
          }
        }, 'Used if the main field is empty or missing')
      )
    ),

    // Настройки slugify
    React.createElement('div', {
      style: {
        backgroundColor: 'white',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
      }
    },
      React.createElement('h3', {
        style: {
          color: '#1f2937',
          marginBottom: '1.5rem',
          fontSize: '1.3rem',
          fontWeight: '700'
        }
      }, '🔧 Slug Generation Settings'),
      
      // Локаль
      React.createElement('div', {
        style: { marginBottom: '1.5rem' }
      },
        React.createElement('label', {
          style: {
            display: 'block',
            fontSize: '0.95rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
          }
        }, 'Locale for transliteration'),
        React.createElement('select', {
          value: settings.slugifyOptions?.locale || 'ru',
          onChange: (e) => setSettings(prev => ({ 
            ...prev, 
            slugifyOptions: { 
              ...prev.slugifyOptions, 
              locale: e.target.value 
            } 
          })),
          style: {
            width: '100%',
            padding: '0.875rem',
            border: '2px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '0.95rem',
            backgroundColor: 'white',
            color: '#1f2937',
            fontWeight: '500'
          }
        },
          React.createElement('option', { value: 'ru' }, 'Russian (ru)'),
          React.createElement('option', { value: 'en' }, 'English (en)'),
          React.createElement('option', { value: 'de' }, 'German (de)'),
          React.createElement('option', { value: 'fr' }, 'French (fr)'),
          React.createElement('option', { value: 'es' }, 'Spanish (es)'),
          React.createElement('option', { value: 'it' }, 'Italian (it)'),
          React.createElement('option', { value: 'pl' }, 'Polish (pl)'),
          React.createElement('option', { value: 'tr' }, 'Turkish (tr)')
        ),
        React.createElement('p', {
          style: {
            fontSize: '0.8rem',
            color: '#6b7280',
            marginTop: '0.5rem',
            lineHeight: '1.4'
          }
        }, 'Locale affects character transliteration. For example: "ё" → "e" (ru) or "yo" (en)')
      )
    ),

    // Кнопка сохранения
    React.createElement('div', {
      style: { 
        textAlign: 'center',
        paddingBottom: '2rem'
      }
    },
      React.createElement('button', {
        onClick: handleSave,
        disabled: loading,
        style: {
          backgroundColor: loading ? '#9ca3af' : '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          padding: '1rem 3rem',
          fontSize: '1.1rem',
          fontWeight: '700',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
          boxShadow: '0 4px 6px rgba(59, 130, 246, 0.15)',
          transform: loading ? 'none' : 'translateY(0)'
        },
        onMouseEnter: (e) => {
          if (!loading) {
            e.target.style.backgroundColor = '#2563eb';
            e.target.style.transform = 'translateY(-1px)';
          }
        },
        onMouseLeave: (e) => {
          if (!loading) {
            e.target.style.backgroundColor = '#3b82f6';
            e.target.style.transform = 'translateY(0)';
          }
        }
      }, loading ? 'Saving...' : 'Save Settings')
    )
  );
};

export default SettingsPage; 